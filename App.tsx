import './global.css';

import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => setIsLiked(!isLiked);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">

        {/* 피드 카드 */}
        <View className="bg-white">

          {/* 프로필 영역 */}
          <View className="flex-row items-center px-3 py-2">
            <Image
              source={require('./assets/profile.jpg')}
              className="w-10 h-10 rounded-full"
            />
            <Text className="ml-3 font-bold text-sm">_soobeenee_</Text>
          </View>

          {/* 게시물 이미지 */}
          <Image
            source={require('./assets/post.jpg')}
            className="w-full h-96"
            resizeMode="cover"
          />

          {/* 좋아요 버튼 */}
          <TouchableOpacity
            className="px-3 py-2"
            onPress={handleLikePress}
          >
            <Image
              source={isLiked ? require('./assets/heart2.png') : require('./assets/heart1.png')}
              className="w-7 h-7"
            />
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}