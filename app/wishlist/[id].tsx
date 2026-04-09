import BackIcon from '@/assets/images/back.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

type WishItem = {
  id: string;
  text: string;
  completed: boolean;
  startDate?: string;
  endDate?: string;
  memo?: string;
};

type MarkedDates = {
  [date: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
  };
};

const STORAGE_KEY = 'wishlist_items';

function getDateRange(startDate: string, endDate: string) {
  const dates: string[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function buildMarkedDates(
  startDate: string | null,
  endDate: string | null
): MarkedDates {
  if (!startDate) return {};

  if (!endDate || startDate === endDate) {
    return {
      [startDate]: {
        startingDay: true,
        endingDay: true,
        color: '#3B82F6',
        textColor: 'white',
      },
    };
  }

  const range = getDateRange(startDate, endDate);
  const result: MarkedDates = {};

  range.forEach((date, index) => {
    if (index === 0) {
      result[date] = {
        startingDay: true,
        color: '#3B82F6',
        textColor: 'white',
      };
    } else if (index === range.length - 1) {
      result[date] = {
        endingDay: true,
        color: '#3B82F6',
        textColor: 'white',
      };
    } else {
      result[date] = {
        color: '#93C5FD',
        textColor: 'white',
      };
    }
  });

  return result;
}

export default function WishDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<WishItem | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed: WishItem[] = JSON.parse(stored);
      const found = parsed.find(wish => wish.id === id);

      if (found) {
        setItem(found);
        setStartDate(found.startDate ?? '');
        setEndDate(found.endDate ?? '');
        setMemo(found.memo ?? '');
      }
    } catch (error) {
      console.log('상세 불러오기 실패:', error);
    }
  };

  const handleDayPress = (day: { dateString: string }) => {
    const selectedDate = day.dateString;

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate('');
      return;
    }

    if (selectedDate < startDate) {
      setStartDate(selectedDate);
      setEndDate(startDate);
      return;
    }

    setEndDate(selectedDate);
  };

  const markedDates = useMemo(() => {
    return buildMarkedDates(startDate, endDate);
  }, [startDate, endDate]);

  const saveDetail = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed: WishItem[] = JSON.parse(stored);

      const updated = parsed.map(wish =>
        wish.id === id
          ? {
              ...wish,
              startDate,
              endDate,
              memo,
            }
          : wish
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      Alert.alert('저장 완료', '상세 내용이 저장되었습니다.');
      router.back();
    } catch (error) {
      console.log('상세 저장 실패:', error);
    }
  };

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>항목을 불러오는 중입니다...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-[60px]">
      <Pressable onPress={() => router.back()}>
        <BackIcon width={24} height={24} />
      </Pressable>

      <Text className="mt-6 text-[28px] font-bold">{item.text}</Text>

      <View className="mt-6 rounded-2xl border border-gray-200 p-4">
        <Text className="mt-4 text-[14px] text-gray-500">상태</Text>
        <Text className="mt-1 text-[16px]">
          {item.completed ? '완료' : '진행중'}
        </Text>

        <Text className="mt-4 text-[14px] text-gray-500">시작일</Text>
        <Text className="mt-1 text-[16px]">{startDate || '선택 전'}</Text>

        <Text className="mt-4 text-[14px] text-gray-500">종료일</Text>
        <Text className="mt-1 text-[16px]">{endDate || '선택 전'}</Text>
      </View>

      <View className="mt-6 rounded-2xl border border-gray-200 p-4">
        <Text className="mb-4 text-[18px] font-semibold">기간 선택</Text>

        <Calendar
          markingType="period"
          markedDates={markedDates}
          onDayPress={handleDayPress}
          enableSwipeMonths
          theme={{
            todayTextColor: '#3B82F6',
            arrowColor: '#3B82F6',
            monthTextColor: '#111827',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 13,
          }}
        />
      </View>

      <View className="mt-6 mb-10 rounded-2xl border border-gray-200 p-4">
        <Text className="mb-3 text-[18px] font-semibold">메모</Text>
        <TextInput
          value={memo}
          onChangeText={setMemo}
          placeholder="이 목표에 대한 메모를 적어보세요"
          multiline
          textAlignVertical="top"
          className="min-h-[120px] rounded-xl border border-gray-300 p-3"
        />
      </View>
      <Pressable
        className="mt-6 mb-10 items-center rounded-xl bg-blue-500 py-4"
        onPress={saveDetail}
      >
        <Text className="text-[16px] font-semibold text-white">저장하기</Text>
      </Pressable>
    </ScrollView>
  );
}
