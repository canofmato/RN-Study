import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Week3DetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { wish, index } = useLocalSearchParams<{
    wish?: string;
    index?: string;
  }>();
  const [memo, setMemo] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: "height" })}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: Math.max(insets.bottom, 16) + 24,
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-xl font-bold">상세 화면</Text>
            <Pressable
              onPress={() => router.back()}
              className="rounded-md bg-black px-3 py-2"
            >
              <Text className="text-white">뒤로가기</Text>
            </Pressable>
          </View>

          <View className="mb-6 rounded-xl border border-black bg-[#FFF9C4] p-4">
            <Text className="mb-2 text-sm text-gray-700">선택한 활동</Text>
            <Text className="text-2xl font-semibold">{wish ?? "제목 없음"}</Text>
            <Text className="mt-2 text-xs text-gray-500">
              항목 번호: {index ?? "-"}
            </Text>
          </View>

          <Text className="mb-2 text-base font-medium">메모</Text>
          <TextInput
            value={memo}
            onChangeText={setMemo}
            placeholder="여기에 간단히 메모하세요."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            className="min-h-[180px] rounded-xl border border-gray-300 p-4 text-base"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
