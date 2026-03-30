import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import ArrowRight from "../assets/images/Arrow-right.svg";
import Github from "../assets/images/Github.svg";
import Info from "../assets/images/Info.svg";
import Photo from "../assets/images/Photo.svg";
import QRcode from "../assets/images/QRcode.svg";
import Velog from "../assets/images/Velog.svg";

export default function HomeScreen() {
  return (
    <View className="flex-1 flex-col gap-6 bg-gray items-center justify-center">
      {/*front card  */}
      <View className="w-[390px] h-[230px] bg-primary rounded-[20px] flex-col py-5 items-center justify-center">
        <View className="w-[348px] flex-col gap-1">
          <View className="flex-row gap-50 items-center justify-between">
            <View className="flex-row gap-1 items-center">
              <Info width={20} height={20} />
              <View className="w-10 h-4 gap-[10px] border border-black items-center justify-center">
                <Text className="text-body text-black">CARD</Text>
              </View>
            </View>

            <View>
              <Text className="text-body text-black">(朴多璘) 박다인</Text>
            </View>
          </View>

          <Text className="text-title text-black">PARK DA-IN</Text>
        </View>

        <View className="w-[348px] flex-row px-[5px] justify-between">
          <View className="h-25 flex-col gap-1">
            <View className="flex-row gap-2">
              <Github width={20} height={20} />
              <Velog width={20} height={20} />
            </View>
            <View className="flex-col gap-1">
              <Text className="text-caption text-black">
                SIGNATURE{"\n"}PHOTO
              </Text>
              <Photo width={43} height={43} />
            </View>
          </View>

          <View className="w-60 flex-col gap-3 py-[3px]">
            <View className="w-50 flex-row justify-between">
              <View className="w-[110px] gap-1 flex-col">
                <Text className="text-caption text-black">NATIONALITY</Text>
                <Text className="text-caption text-black">
                  REPUBLIC OF KOREA
                </Text>
              </View>
              <View className="w-[110px] gap-1 flex-col">
                <Text className="text-caption text-black">CONTACT</Text>
                <Text className="text-caption text-black">
                  GUNMANNDUU@GMAIL.COM
                </Text>
              </View>
            </View>

            <View className="w-50 flex-row justify-between">
              <View className="w-[110px] gap-1 flex-col">
                <Text className="text-caption text-black">DATE OF BIRTH</Text>
                <Text className="text-caption text-black">2002.12.29</Text>
              </View>
              <View className="w-[110px] gap-1 flex-col">
                <Text className="text-caption text-black">MOBILE</Text>
                <Text className="text-caption text-black">010-3104-0784</Text>
              </View>
            </View>

            <View className="w-60 gap-2 pl-2 border-l-[1.5px] border-l-[#1E1E1E]">
              <Text className="text-mini text-black">
                ⚫ 안녕하세요 박다인입니다.⚫ 프론트엔드 개발자로써 다양한
                프로젝트 경험을 쌓아가고 있어요.⚫️ 도전하는 것을 좋아하고,
                새로움에 두려움 없이 도전해요.⚫️ 외향적인 성격이에요.⚫ 매콤한
                음식들을 좋아해요.(떡볶이와 훠궈)⚫ 경기도민입니다.⚫️ (ENTP)
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* back card */}
      <View className="w-[390px] h-[230px] bg-primary rounded-[20px] px-[22px] py-[34px] items-center justify-center">
        <View className="flex-row gap-10 p-5 items-center justify-center">
          <Link href={"/more" as any} asChild>
            <Pressable>
              <Text className="text-body text-black">MORE(IG)</Text>
            </Pressable>
          </Link>

          <ArrowRight width={12} height={12} />
          <QRcode width={70} height={70} />
        </View>
      </View>
    </View>
  );
}
