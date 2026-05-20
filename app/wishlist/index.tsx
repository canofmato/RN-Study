import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import Blueheart from "../../assets/wishlist/blueheart.svg";
import Click from "../../assets/wishlist/click.svg";
import Eclipse from "../../assets/wishlist/eclipse.svg";
import Input from "../../assets/wishlist/input.svg";
import Phone from "../../assets/wishlist/phone.svg";

const WISHLIST_STORAGE_KEY = "@wishlist/items";

export default function WishlistScreen() {
  const [wishText, setWishText] = useState("");
  const [wishList, setWishList] = useState<string[]>([]);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);

        if (!storedWishlist) {
          return;
        }

        const parsedWishlist: unknown = JSON.parse(storedWishlist);

        if (
          Array.isArray(parsedWishlist) &&
          parsedWishlist.every((item) => typeof item === "string")
        ) {
          setWishList(parsedWishlist);
        }
      } catch (error) {
        console.warn("Failed to load wishlist", error);
      }
    };

    loadWishlist();
  }, []);

  const saveWishlist = (nextWishList: string[]) => {
    AsyncStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(nextWishList)
    ).catch((error) => console.warn("Failed to save wishlist", error));
  };

  const handleAddWish = () => {
    const trimmed = wishText.trim();
    if (!trimmed) {
      return;
    }

    setWishList((prev) => {
      const nextWishList = [...prev, trimmed];
      saveWishlist(nextWishList);
      return nextWishList;
    });
    setWishText("");
  };

  const handleDeleteWish = (targetIndex: number) => {
    setWishList((prev) => {
      const nextWishList = prev.filter((_, index) => index !== targetIndex);
      saveWishlist(nextWishList);
      return nextWishList;
    });
  };

  const [fontsLoaded] = useFonts({
    "Libre-Bodoni": require("../../assets/fonts/LibreBodoni.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Week3ScreenContent
      wishText={wishText}
      setWishText={setWishText}
      wishList={wishList}
      onAddWish={handleAddWish}
      onDeleteWish={handleDeleteWish}
    />
  );
}

type Week3ScreenContentProps = {
  wishText: string;
  setWishText: Dispatch<SetStateAction<string>>;
  wishList: string[];
  onAddWish: () => void;
  onDeleteWish: (index: number) => void;
};

function Week3ScreenContent({
  wishText,
  setWishText,
  wishList,
  onAddWish,
  onDeleteWish,
}: Week3ScreenContentProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      className="flex-1"
      style={{ flex: 1 }}
      edges={["top"]}
    >
        <LinearGradient
          colors={["#4759FF", "#FFF"]}
          locations={[0.0817, 0.8221]}
          className="flex-1 items-center"
          style={{ flex: 1, width: "100%" }}
        >
          <KeyboardAvoidingView
            style={{ flex: 1, width: "100%" }}
            behavior={Platform.select({ ios: "padding", android: "height" })}
            keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
          >
            <ScrollView
              style={{ flex: 1, width: "100%" }}
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                paddingBottom: Math.max(insets.bottom, 12) + 24,
              }}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  flexGrow: 1,
                }}
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
                onPress={() =>
                  router.push(
                    `/wishlist/detail?wish=${encodeURIComponent(wish)}&index=${index}`
                  )
                }
                onLongPress={() => onDeleteWish(index)}
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

                <View style={{ flexGrow: 1, minHeight: 24 }} />

          <View className="w-full flex-row items-center justify-center gap-3">
            <View style={{ width: 185, height: 41, justifyContent: "center" }}>
              <Input
                width={185}
                height={41}
                style={{ position: "absolute", left: 0, top: 0 }}
              />
              <TextInput
                value={wishText}
                onChangeText={setWishText}
                onSubmitEditing={onAddWish}
                placeholder="고민 중..."
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
            <Pressable onPress={onAddWish}>
              <Click width={56} height={56} />
            </Pressable>
          </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
    </SafeAreaView>
  );
}
