import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import BackIcon from '@/assets/images/back.svg';
import CheckIcon from '@/assets/images/check.svg';

type WishItem = {
  id: string;
  text: string;
  completed: boolean;
};

export default function WishlistScreen() {
  const [input, setInput] = useState('');
  const [wishList, setWishList] = useState<WishItem[]>([
    { id: '1', text: '과제하기', completed: false },
    { id: '2', text: '스터디 준비하기', completed: false },
    { id: '3', text: '운동하기', completed: false },
  ]);

  const addWish = () => {
    if (input.trim() === '') return;

    const newWish: WishItem = {
      id: Date.now().toString(),
      text: input,
      completed: false,
    };

    setWishList(prev => [...prev, newWish]);
    setInput('');
  };

  const toggleComplete = (id: string) => {
    setWishList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteWish = (id: string) => {
    setWishList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View className="flex-1 bg-white px-4 pt-[60px]">
      <Pressable onPress={() => router.back()}>
        <BackIcon width={24} height={24} />
      </Pressable>

      <Text className="mt-5 mb-5 text-[26px] font-bold">Wish List</Text>

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
          <Text className="font-semibold text-white">추가</Text>
        </Pressable>
      </View>

      <FlatList
        data={wishList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View className="mb-3 flex-row items-center rounded-lg border border-gray-200 p-4">
            <Pressable
              className={`mr-2.5 h-5 w-5 items-center justify-center rounded border-2 border-blue-500 ${
                item.completed ? 'bg-blue-500' : 'bg-white'
              }`}
              onPress={() => toggleComplete(item.id)}
            >
              {item.completed && (
                <CheckIcon width={14} height={14} />
              )}
            </Pressable>

            <Text
              className={`flex-1 text-[16px] ${
                item.completed ? 'text-gray-400 line-through' : 'text-black'
              }`}
            >
              {item.text}
            </Text>

            <Pressable
              className="ml-3 rounded-md bg-red-500 px-2.5 py-1.5"
              onPress={() => deleteWish(item.id)}
            >
              <Text className="text-[13px] font-semibold text-white">삭제</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text className="mt-8 text-center text-gray-500">
            등록된 할 일이 없습니다.
          </Text>
        }
      />
    </View>
    </KeyboardAvoidingView>
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