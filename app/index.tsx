import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ paddingHorizontal: 24, paddingTop: 40, paddingBottom: 16 }}
        >
          <Text style={{ fontSize: 22, fontWeight: "500", color: "#111" }}>
            🪄 React Native 스터디 실습 목록
          </Text>
          <Text style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
            주차별 실습
          </Text>
        </View>

        <View style={{ paddingHorizontal: 24, gap: 12 }}>
          <Link href="/week2" asChild>
            <TouchableOpacity
              style={{
                padding: 20,
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: "#ddd",
              }}
            >
              <Text style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                2주차
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#111" }}>
                인스타그램 레이아웃 설정
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/week3" asChild>
            <TouchableOpacity
              style={{
                padding: 20,
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: "#ddd",
              }}
            >
              <Text style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                3주차
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#111" }}>
                위시리스트/할 일 목록 만들기
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
