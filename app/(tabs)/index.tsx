import { Gaegu_400Regular } from '@expo-google-fonts/gaegu';
import { IslandMoments_400Regular, useFonts } from '@expo-google-fonts/island-moments';
import { useWishlist, type WishlistItem } from '@/components/wishlist-context';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOutLeft, LinearTransition } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function WishlistScreen() {
  const router = useRouter();
  const { items, addItem: createWishlistItem, deleteItem, toggleCheck } = useWishlist();
  const [fontsLoaded] = useFonts({
    'island-moments': IslandMoments_400Regular,
    'gaegu': Gaegu_400Regular,
  });
  const [newItem, setNewItem] = useState('');
  const [keyboardBottom, setKeyboardBottom] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, (event) => {
      const keyboardOverlap = Math.max(containerHeight - event.endCoordinates.screenY, 0);
      setKeyboardBottom(keyboardOverlap + 8);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardBottom(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [containerHeight]);

  if (!fontsLoaded) {
    return null;
  }

  const handleAddItem = () => {
    const newWishItem = createWishlistItem(newItem);
    if (newWishItem) {
      router.push({
        pathname: '/wish/[id]',
        params: { id: newWishItem.id },
      });
      setNewItem('');
    }
  };

  const renderDeleteAction = (item: WishlistItem) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.deleteAction}
      onPress={() => deleteItem(item.id)}>
      <Text style={styles.deleteActionText}>삭제</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }: { item: WishlistItem; index: number }) => (
    <Animated.View
      entering={FadeIn.delay(Math.min(index * 40, 120)).duration(180)}
      exiting={FadeOutLeft.duration(180)}
      layout={LinearTransition.duration(160)}
      style={styles.swipeRow}>
      <Swipeable
        overshootRight={false}
        rightThreshold={36}
        renderRightActions={() => renderDeleteAction(item)}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.itemCard}
          onPress={() =>
            router.push({
              pathname: '/wish/[id]',
              params: { id: item.id },
            })
          }
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
      </Swipeable>
    </Animated.View>
  );

  return (
    <View
      style={styles.container}
      onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
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

      <View pointerEvents="none" style={styles.catContainer}>
        <Image
          source={require('@/assets/images/black_cat.png')}
          style={styles.catImage}
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          { bottom: keyboardBottom || 32 },
        ]}>
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={handleAddItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
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
    zIndex: 1,
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
    zIndex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 112,
  },
  swipeRow: {
    marginBottom: 16,
    overflow: 'hidden',
    borderRadius: 8,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  deleteAction: {
    width: 76,
    minHeight: 40,
    marginLeft: 12,
    borderRadius: 8,
    backgroundColor: '#FF4D6D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteActionText: {
    color: '#FFF',
    fontFamily: 'gaegu',
    fontSize: 18,
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
    zIndex: 0,
  },
  catImage: {
    width: 240,
    height: 240,
    aspectRatio: 1,
    opacity: 0.6,
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    alignItems: 'center',
    zIndex: 2,
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
