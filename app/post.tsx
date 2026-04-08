import { Image, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function PostScreen() {
  const [liked, setLiked] = useState(false);

  return (
    <View className="flex-1 bg-white px-4 pt-[60px]">
      <Pressable onPress={() => router.back()}>
        <Text className="mb-4 text-[24px]">←</Text>
      </Pressable>

      <View className="mb-3 flex-row items-center">
        <Image
          source={require('@/assets/images/profile.png')}
          className="mr-2 h-[36px] w-[36px] rounded-full"
        />
        <Text className="text-[14px] font-semibold">엄민서</Text>
      </View>

      <Image
        source={require('@/assets/images/post.png')}
        className="mb-3 h-[380px] w-full"
      />

      <Pressable onPress={() => setLiked(!liked)}>
        <Image
        source={
          liked
            ? require('@/assets/images/heart_fill.png')
            : require('@/assets/images/heart.png')
        }
        style={{ width: 28, height: 28 }}
        />
      </Pressable>
    </View>
  );
}