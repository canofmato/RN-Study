import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MoreScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 flex-col py-[50px] bg-white">
      {/* header */}
      <View className="flex-row px-3 py-4 items-center justify-between border-b border-b-gray">
        <TouchableOpacity
          onPress={() => router.back()} // 2. 뒤로 가기 실행
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/images/Chevron-left.png")}
            className="w-[30px] h-[30px] object-contain"
          />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-heading3 text-black font-bold text-black">
            Posts
          </Text>
          <Text className="text-body text-black">blackcatsaysmeow</Text>
        </View>

        <View className="w-[30px] h-[30px]" />
      </View>

      {/* main */}
      <View className="flex-col">
        {/* profile */}
        <View className="flex-row px-3 py-[10px] items-center justify-between">
          <View className="flex-row gap-2">
            <Image
              source={require("../assets/images/profile.jpg")}
              className="w-10 h-10 rounded-full"
            />
            <View className="flex-col gap-1 px-1">
              <Text className="text-body font-semibold">blackcatsaysmeow</Text>
              <View className="flex-row gap-1">
                <Image
                  source={require("../assets/images/Music.png")}
                  className="w-[15px] h-[15px]"
                />
                <Text className="text-body text-black">
                  Hearts2Hearts ﹒ RUDE!
                </Text>
              </View>
            </View>
          </View>
          <Image
            source={require("../assets/images/More-horizontal.png")}
            className="w-5 h-5"
          />
        </View>

        {/* feed */}
        <ScrollView
          horizontal={true} // 가로 스크롤 활성화
          pagingEnabled={true} // 스냅 효과(한 장씩 딱딱 걸리는 효과)
          showsHorizontalScrollIndicator={true} // 아래 스크롤바
          className="w-[402px] h-[536px]"
        >
          <Image
            source={require("../assets/images/chat.jpg")}
            className="w-[402px] h-[536px]"
          />
          <Image
            source={require("../assets/images/carhead.jpg")}
            className="w-[402px] h-[536px]"
          />
          <Image
            source={require("../assets/images/mountain.jpg")}
            className="w-[402px] h-[536px]"
          />
          <Image
            source={require("../assets/images/sea.jpg")}
            className="w-[402px] h-[536px]"
          />
        </ScrollView>

        {/* reaction */}
        <View className="flex-row px-3 py-4 items-center justify-between">
          <View className="flex-row gap-4">
            <Image
              source={require("../assets/images/Heart.png")}
              className="w-5 h-5"
            />
            <Image
              source={require("../assets/images/chat_bubble.png")}
              className="w-5 h-5"
            />
            <Image
              source={require("../assets/images/Send.png")}
              className="w-5 h-5"
            />
          </View>

          <Image
            source={require("../assets/images/Bookmark.png")}
            className="w-5 h-5"
          />
        </View>
      </View>

      {/* comment */}
      <View className="flex-col px-3 items-start">
        <View className="flex-row gap-2 py-[6px]">
          <Text className="text-body font-bold text-black">
            blackcatsaysmeow
          </Text>
          <Text className="text-body text-black">post message</Text>
        </View>
        <Text className="text-body text-gray-500">March 25</Text>
      </View>
    </View>
  );
}
