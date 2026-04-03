import { Gaegu_400Regular } from '@expo-google-fonts/gaegu';
import { IslandMoments_400Regular, useFonts } from '@expo-google-fonts/island-moments';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

interface WishlistItem {
  id: string;
  title: string;
  checked: boolean;
}

export default function WishlistScreen() {
  const [fontsLoaded] = useFonts({
    'island-moments': IslandMoments_400Regular,
    'gaegu': Gaegu_400Regular,
  });

  const [items, setItems] = useState<WishlistItem[]>([
    { id: '1', title: '유럽 가기', checked: false },
    { id: '2', title: '대학 졸업하기', checked: false },
    { id: '3', title: '번지점프 해보기', checked: false },
  ]);
  
  const [newItem, setNewItem] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  const addItem = () => {
    if (newItem.trim() === '') {
      return;
    }

    const newWishItem: WishlistItem = {
      id: Date.now().toString(),
      title: newItem,
      checked: false,
    };

    setItems([newWishItem, ...items]);
    setNewItem('');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleCheck = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const renderItem = ({ item }: { item: WishlistItem }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onLongPress={() => {
        Alert.alert('삭제', `'${item.title}'을(를) 삭제하시겠어요?`, [
          { text: '취소', onPress: () => {}, style: 'cancel' },
          { text: '삭제', onPress: () => deleteItem(item.id), style: 'destructive' },
        ]);
      }}>
      <TouchableOpacity 
        style={styles.checkBox}
        onPress={() => toggleCheck(item.id)}>
        {item.checked && <View style={styles.checkMark} />}
      </TouchableOpacity>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wish List</Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />

      <View style={styles.catContainer}>
        <Image
          source={require('@/assets/images/black_cat.png')}
          style={styles.catImage}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={addItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#602BFF',
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#602BFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerTitle: {
    fontFamily: 'island-moments',
    fontSize: 64,
    color: '#FFF',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    width: 12,
    height: 12,
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  itemTitle: {
    fontFamily: 'gaegu',
    fontSize: 20,
    color: '#FFF',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  catContainer: {
    position: 'absolute',
    bottom: 100,
    left: -48,
    width: 240,
    height: 240,
  },
  catImage: {
    width: 240,
    height: 240,
    aspectRatio: 1,
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'gaegu',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 28,
    color: '#602BFF',
    fontWeight: '600',
  },
});
