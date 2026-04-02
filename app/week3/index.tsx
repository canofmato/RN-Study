import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Blueheart from "../../assets/week3/blueheart.svg";
import Click from "../../assets/week3/click.svg";
import Eclipse from "../../assets/week3/eclipse.svg";
import Input from "../../assets/week3/input.svg";
import Phone from "../../assets/week3/phone.svg";

export default function Week3Screen() {
  const [wishText, setWishText] = useState("");
  const [wishList, setWishList] = useState<string[]>([]);

  const handleAddWish = () => {
    const trimmed = wishText.trim();
    if (!trimmed) {
      return;
    }

    setWishList((prev) => [...prev, trimmed]);
    setWishText("");
  };

  const handleDeleteWish = (targetIndex: number) => {
    setWishList((prev) => prev.filter((_, index) => index !== targetIndex));
  };

  const [fontsLoaded] = useFonts({
    "Libre-Bodoni": require("../../assets/fonts/LibreBodoni.ttf"),
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <LinearGradient
          colors={["#4759FF", "#FFF"]}
          locations={[0.0817, 0.8221]}
          className="flex-1 items-center"
        >
          <View className="w-full bg-[#00FF3C] py-2 items-center">
            <Text className="text-black text-xs">made by @yuvvinn</Text>
          </View>

          <View className="relative mt-[35px] w-[373px] items-center">
            <Eclipse
              width={373}
              height={33}
              style={{ position: "absolute", top: 10, zIndex: 1 }}
            />

            <View style={{ position: "relative", zIndex: 2, paddingTop: 4 }}>
              <Text
                className="absolute text-[60px] font-['Libre-Bodoni'] text-black"
                style={{
                  fontWeight: "400",
                  lineHeight: 60,
                  left: -1,
                  top: 0,
                  textAlign: "center",
                }}
              >
                My <Text className="text-black">Wish</Text>List.kr
              </Text>
              <Text
                className="absolute text-[60px] font-['Libre-Bodoni'] text-black"
                style={{
                  fontWeight: "400",
                  lineHeight: 60,
                  left: 1,
                  top: 0,
                  textAlign: "center",
                }}
              >
                My <Text className="text-black">Wish</Text>List.kr
              </Text>
              <Text
                className="absolute text-[60px] font-['Libre-Bodoni'] text-black"
                style={{
                  fontWeight: "400",
                  lineHeight: 60,
                  left: 0,
                  top: -1,
                  textAlign: "center",
                }}
              >
                My <Text className="text-black">Wish</Text>List.kr
              </Text>
              <Text
                className="absolute text-[60px] font-['Libre-Bodoni'] text-black"
                style={{
                  fontWeight: "400",
                  lineHeight: 60,
                  left: 0,
                  top: 1,
                  textAlign: "center",
                }}
              >
                My <Text className="text-black">Wish</Text>List.kr
              </Text>
              <Text
                className="text-[60px] font-['Libre-Bodoni'] text-white"
                style={{
                  fontWeight: "400",
                  lineHeight: 60,
                  textAlign: "center",
                }}
              >
                My <Text className="text-[#FF0]">Wish</Text>List.kr
              </Text>
            </View>
          </View>

          <View className="mt-6 w-[86%] self-center items-center max-w-[360px] border-4 border-black bg-[#FF0] px-4 py-5">
            <Text className="text-center text-2xl font-extrabold">
              관심있는 활동을 입력해주세요.
            </Text>
            <Text className="text-center text-2xl font-extrabold italic">
              Type your favorite activity.
            </Text>
          </View>

          <View className="mt-12 w-[80%] gap-8">
            {wishList.map((wish, index) => (
              <Pressable
                key={`${wish}-${index}`}
                onLongPress={() => handleDeleteWish(index)}
                delayLongPress={250}
                className="flex-row items-center gap-3"
              >
                {index % 2 === 0 ? (
                  <Phone width={40} height={60} />
                ) : (
                  <Blueheart width={64} height={60} />
                )}
                <Text className="text-3xl">{wish}</Text>
              </Pressable>
            ))}
          </View>

          <View className="mt-auto mb-10 w-full flex-row items-center justify-center gap-3">
            <View style={{ width: 185, height: 41, justifyContent: "center" }}>
              <Input
                width={185}
                height={41}
                style={{ position: "absolute", left: 0, top: 0 }}
              />
              <TextInput
                value={wishText}
                onChangeText={setWishText}
                onSubmitEditing={handleAddWish}
                placeholder="고민하는 중..."
                placeholderTextColor="#666"
                returnKeyType="done"
                style={{
                  height: 41,
                  paddingHorizontal: 14,
                  fontSize: 14,
                  color: "#000",
                }}
              />
            </View>
            <Pressable onPress={handleAddWish}>
              <Click width={56} height={56} />
            </Pressable>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
