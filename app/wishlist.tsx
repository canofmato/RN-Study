import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';

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
    { id: '2', text: '운동하기', completed: false },
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
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}></Text>
      </Pressable>

      <Text style={styles.title}>Wish List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="할 일을 입력하세요"
          value={input}
          onChangeText={setInput}
        />
        <Pressable style={styles.addButton} onPress={addWish}>
          <Text style={styles.addButtonText}>추가</Text>
        </Pressable>
      </View>

      <FlatList
        data={wishList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Pressable
              style={[styles.checkbox, item.completed && styles.checkedBox]}
              onPress={() => toggleComplete(item.id)}
            >
            {item.completed && <Text style={styles.checkMark}>✓</Text>}
            </Pressable>
            <Text
              style={[
                styles.itemText,
                item.completed && styles.completedText,
              ]}
            >
              {item.text}
            </Text>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteWish(item.id)}
            >
              <Text style={styles.deleteButtonText}>삭제</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>등록된 할 일이 없습니다.</Text>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  back: {
    fontSize: 24,
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },

  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  checkedBox: {
    backgroundColor: '#3B82F6',
  },

  checkMark: {
    color: 'white',
    fontSize: 14,
  },

  itemText: {
    flex: 1,
    fontSize: 16,
  },

  completedText: {
    textDecorationLine: 'line-through',
  },

  deleteButton: {
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#EF4444',
    borderRadius: 6,
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 30,
  },
});