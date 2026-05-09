import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
// 실제 실습 내용이 담긴 컴포넌트들 임포트
import Week2 from "../components/week2";
import Week3 from "../components/week3";
import Week5 from "../components/week5";

export default function DetailGate() {
  const { id } = useLocalSearchParams();

  // id 값에 따라 보여줄 컴포넌트 매칭
  const renderContent = () => {
    switch (id) {
      case "week2":
        return <Week2 />;
      case "week3":
        return <Week3 />;
      case "week5":
        return <Week5 />;
      default:
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>해당 실습 페이지를 찾을 수 없습니다.</Text>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 이동했을 때 상단 헤더 타이틀을 동적으로 설정 */}
      <Stack.Screen
        options={{ title: `${id?.toString().toUpperCase()} 실습` }}
      />
      {renderContent()}
    </View>
  );
}
