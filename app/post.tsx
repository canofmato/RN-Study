import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function PostScreen() {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>←</Text>
      </Pressable>

      <View style={styles.profileRow}>
        <Image
          source={require('@/assets/images/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.username}>엄민서</Text>
      </View>

      <Image
        source={require('@/assets/images/post.png')}
        style={styles.postImage}
      />

      <Pressable onPress={() => setLiked(!liked)}>
        <Text style={styles.like}>{liked ? '♥' : '♡'}</Text>
      </Pressable>
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

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },

  username: {
    fontSize: 14,
    fontWeight: '600',
  },

  postImage: {
    width: '100%',
    height: 380,
    marginBottom: 12,
  },
  
  like: {
    fontSize: 28,
  },
});