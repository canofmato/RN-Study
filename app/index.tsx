import { Image, Text, View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="mt-[60px] flex-row items-center px-5 py-5">
        <Image
          source={require('@/assets/images/profile.png')}
          className="mr-5 h-[100px] w-[100px] rounded-full"
        />
        <View className="flex-1 flex-row justify-around">
          <View className="items-center">
            <Text className="text-[18px] font-bold">3</Text>
            <Text>게시물</Text>
          </View>
          <View className="items-center">
            <Text className="text-[18px] font-bold">100</Text>
            <Text>팔로워</Text>
          </View>
          <View className="items-center">
            <Text className="text-[18px] font-bold">100</Text>
            <Text>팔로잉</Text>
          </View>
        </View>
      </View>

      <View className="px-5">
        <Text className="mb-1 text-[16px] font-bold">엄민서</Text>
        <Text className="text-[14px]">숙명여자대학교 IT공학전공</Text>

        <Pressable
          className="mt-2 items-center rounded-lg bg-blue-500 py-2.5"
          onPress={() => router.push('/wishlist')}
        >
          <Text className="font-semibold text-white">Wish List</Text>
        </Pressable>

        <Pressable
          className="mt-2 items-center rounded-lg bg-blue-500 py-2.5"
          onPress={() => router.push('/weather')}
        >
          <Text className="font-semibold text-white">View Weather</Text>
        </Pressable>
      </View>

      <View className="mt-4 flex-row flex-wrap justify-between px-1">
        <Pressable className="w-[32%]" onPress={() => router.push('/post')}>
          <Image
            source={require('@/assets/images/post.png')}
            className="w-full"
            resizeMode="contain"
          />
        </Pressable>

        <Pressable className="w-[32%]" onPress={() => router.push('/post')}>
          <Image
            source={require('@/assets/images/post.png')}
            className="w-full"
            resizeMode="contain"
          />
        </Pressable>

        <Pressable className="w-[32%]" onPress={() => router.push('/post')}>
          <Image
            source={require('@/assets/images/post.png')}
            className="w-full"
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}