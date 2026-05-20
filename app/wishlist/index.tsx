import BackIcon from '@/assets/images/back.svg';
import CheckIcon from '@/assets/images/check.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  LayoutAnimation,
  UIManager,

} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeInDown,
  FadeOut,
} from 'react-native-reanimated';

type WishItem = {
  id: string;
  text: string;
  completed: boolean;
  startDate?: string;
  endDate?: string;
  memo?: string;
};

const STORAGE_KEY = 'wishlist_items';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function WishlistScreen() {
  const [input, setInput] = useState('');
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadWishList();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveWishList(wishList);
  }, [wishList, loaded]);

  const loadWishList = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        setWishList(JSON.parse(stored));
      } else {
        setWishList([
          {
            id: '1',
            text: '과제하기',
            completed: false,
            memo: '',
            startDate: '',
            endDate: '',
          },
          {
            id: '2',
            text: '스터디 준비하기',
            completed: false,
            memo: '',
            startDate: '',
            endDate: '',
          },
          {
            id: '3',
            text: '운동하기',
            completed: false,
            memo: '',
            startDate: '',
            endDate: '',
          },
        ]);
      }
    } catch (error) {
      console.log('위시리스트 불러오기 실패:', error);
    } finally {
      setLoaded(true);
    }
  };

  const saveWishList = async (items: WishItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.log('위시리스트 저장 실패:', error);
    }
  };

  const addWish = () => {
    if (input.trim() === '') return;

    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    const newWish: WishItem = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
      memo: '',
      startDate: '',
      endDate: '',
    };

    setWishList(prev => [...prev, newWish]);
    setInput('');
  };

  const toggleComplete = (id: string) => {
    setWishList(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteWish = (id: string) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setWishList(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const goToDetail = (item: WishItem) => {
    router.push({
      pathname: '/wishlist/[id]',
      params: { id: item.id },
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 bg-white px-4 pt-[60px]">
          <Pressable onPress={() => router.back()}>
            <BackIcon width={24} height={24} />
          </Pressable>

          <Text className="mb-5 mt-5 text-[26px] font-bold">
            Wish List
          </Text>

          <View className="mb-5 flex-row">
            <TextInput
              className="mr-2 h-12 flex-1 rounded-lg border border-gray-300 px-3"
              placeholder="할 일을 입력하세요"
              value={input}
              onChangeText={setInput}
            />

            <Pressable
              className="items-center justify-center rounded-lg bg-blue-500 px-4"
              onPress={addWish}
            >
              <Text className="font-semibold text-white">
                추가
              </Text>
            </Pressable>
          </View>

          <FlatList
            data={wishList}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const renderRightActions = () => (
                <Pressable
                  className="mb-3 items-center justify-center rounded-lg bg-red-500 px-5"
                  onPress={() => deleteWish(item.id)}
                >
                  <Text className="font-semibold text-white">
                    삭제
                  </Text>
                </Pressable>
              );

              return (
                <ReanimatedSwipeable
                  renderRightActions={renderRightActions}
                >
                  <Pressable
                    onPress={() => goToDetail(item)}
                  >
                    <Animated.View
                      entering={FadeInDown
                        .duration(350)
                        .springify()}
                      exiting={FadeOut.duration(200)}
                    >
                      <View className="mb-3 flex-row items-center rounded-lg border border-gray-200 bg-white p-4">
                        <Pressable
                          className={`mr-2.5 h-5 w-5 items-center justify-center rounded border-2 border-blue-500 ${
                            item.completed
                              ? 'bg-blue-500'
                              : 'bg-white'
                          }`}
                          onPress={() =>
                            toggleComplete(item.id)
                          }
                        >
                          {item.completed && (
                            <CheckIcon
                              width={14}
                              height={14}
                            />
                          )}
                        </Pressable>

                        <Text
                          className={`flex-1 text-[16px] ${
                            item.completed
                              ? 'text-gray-400 line-through'
                              : 'text-black'
                          }`}
                        >
                          {item.text}
                        </Text>
                      </View>
                    </Animated.View>
                  </Pressable>
                </ReanimatedSwipeable>
              );
            }}
            ListEmptyComponent={
              <Text className="mt-8 text-center text-gray-500">
                등록된 할 일이 없습니다.
              </Text>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
  },
});
