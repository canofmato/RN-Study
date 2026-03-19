import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// 폰트 로딩 전까지 화면 유지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Roboto-Thin": Roboto_100Thin,
    "Roboto-Light": Roboto_300Light,
    "Roboto-Regular": Roboto_400Regular,
    "Roboto-Medium": Roboto_500Medium,
    "Roboto-SemiBold": Roboto_600SemiBold,
    "Roboto-Bold": Roboto_700Bold,
    "Roboto-Black": Roboto_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 모든 화면에서 상단바를 숨긴다 */}

      {/* index.tsx가 첫 화면*/}
      <Stack.Screen name="index" />
    </Stack>
  );
}
