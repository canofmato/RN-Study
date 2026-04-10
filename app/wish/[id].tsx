import { Gaegu_400Regular, useFonts } from '@expo-google-fonts/gaegu';
import { useWishlist } from '@/components/wishlist-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function WishDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items, updateItemNote } = useWishlist();
  const [fontsLoaded] = useFonts({
    gaegu: Gaegu_400Regular,
  });

  const item = items.find((wishlistItem) => wishlistItem.id === id);

  if (!fontsLoaded || !item) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <TextInput
          style={styles.noteInput}
          multiline
          textAlignVertical="top"
          placeholder="여기에 위시리스트에 대한 계획을 적어보세요."
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={item.note}
          onChangeText={(text) => updateItemNote(item.id, text)}
        />
      </View>

      <View style={styles.catContainer}>
        <Image
          source={require('@/assets/images/black_cat.png')}
          style={styles.catImage}
        />
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
  backButton: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'gaegu',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 56,
  },
  title: {
    color: '#FFF',
    fontFamily: 'gaegu',
    fontSize: 48,
    lineHeight: 60,
    marginBottom: 64,
  },
  noteInput: {
    color: '#FFF',
    fontFamily: 'gaegu',
    fontSize: 20,
    lineHeight: 32,
    minHeight: 220,
    padding: 0,
    paddingRight: 12,
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
});
