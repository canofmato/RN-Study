import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Bookmark from "../assets/images/Bookmark.svg";
import ChatBubble from "../assets/images/chat_bubble.svg";
import ChevronLeft from "../assets/images/Chevron-left.svg";
import Heart from "../assets/images/Heart.svg";
import More from "../assets/images/More-horizontal.svg";
import Music from "../assets/images/Music.svg";
import Profile from "../assets/images/profile.svg";
import Send from "../assets/images/Send.svg";

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
          <ChevronLeft width={30} height={30} />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-heading3 text-black font-bold">Posts</Text>
          <Text className="text-body text-black">blackcatsaysmeow</Text>
        </View>

        <View className="w-[30px] h-[30px]" />
      </View>

      {/* main */}
      <View className="flex-col">
        {/* profile */}
        <View className="flex-row px-3 py-[10px] items-center justify-between">
          <View className="flex-row gap-2">
            <View className="w-10 h-10 rounded-full overflow-hidden">
              <Profile width={40} height={40} />
            </View>

            <View className="flex-col gap-1 px-1">
              <Text className="text-body font-semibold">blackcatsaysmeow</Text>
              <View className="flex-row gap-1">
                <Music width={15} height={15} />
                <Text className="text-body text-black">
                  Hearts2Hearts ﹒ RUDE!
                </Text>
              </View>
            </View>
          </View>
          <More width={20} height={20} />
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
            <Heart width={20} height={20} />
            <ChatBubble width={20} height={20} />
            <Send width={20} height={20} />
          </View>

          <Bookmark width={20} height={20} />
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
