import { Image, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '@/assets/images/back.svg';

export default function PostScreen() {
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="flex-1 px-4">
        <Pressable onPress={() => router.back()} className="h-10 justify-center">
          <BackIcon width={24} height={24} />
        </Pressable>

        <View className="mt-3 mb-3 flex-row items-center">
          <Image
            source={require('@/assets/images/profile.png')}
            className="mr-2 h-[36px] w-[36px] rounded-full"
          />

          <Text className="text-[14px] font-semibold">엄민서</Text>
        </View>

        <Image
          source={require('@/assets/images/post.png')}
          className="mb-3 h-[380px] w-full rounded-md"
          resizeMode="cover"
        />

        <Pressable onPress={() => setLiked(prev => !prev)} className="h-10 w-10 justify-center">
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
    </SafeAreaView>
  );
}