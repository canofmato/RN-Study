import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROJECTS = [
  { id: "week2" as const, title: "인스타그램 레이아웃" },
  { id: "week3" as const, title: "할 일 목록 만들기" },
  { id: "week5" as const, title: "API 관련 실습" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        {/* 헤더 부분 */}
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

        {/* 리스트 부분 */}
        <View style={{ paddingHorizontal: 24, gap: 12 }}>
          {PROJECTS.map((item) => (
            <Link key={item.id} href={`/${item.id}`} asChild>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  padding: 20,
                  borderRadius: 12,
                  borderWidth: 0.5,
                  borderColor: "#ddd",
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                  {item.id}
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111" }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
