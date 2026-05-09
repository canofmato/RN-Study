import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { WeatherCondition, weatherOptions } from "../constants/weather";

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");

  // 1. 발급받은 API 키를 여기에 넣으세요!
  const API_KEY = "17c08d17f178e9ad4c4dffae347a5753";

  // 2. 날씨 데이터를 가져오는 함수 (도시 이름을 인자로 받음)
  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      );
      const json = await response.json();

      if (json.cod === "404") {
        Alert.alert(
          "도시 찾기 실패",
          "영문 도시 이름을 확인해 주세요 (예: Seoul, Busan)",
        );
      } else {
        setWeather(json);
      }
    } catch (error) {
      Alert.alert("에러", "네트워크 연결을 확인해 주세요.");
    } finally {
      setLoading(false);
      Keyboard.dismiss(); // 검색 후 키보드 닫기
    }
  };

  // 3. 앱이 처음 켜질 때 기본값으로 'Seoul' 날씨 호출
  useEffect(() => {
    fetchWeather("Seoul");
  }, []);

  // 4. 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    if (inputText.trim().length === 0) return;
    fetchWeather(inputText);
    setInputText("");
  };

  if (loading && !weather) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // 5. 현재 날씨 상태에 따른 테마 결정
  const condition = (weather?.weather[0].main as WeatherCondition) || "Default";
  const theme = weatherOptions[condition] || weatherOptions.Default;

  return (
    // 배경색 동적 변경
    <View className={`flex-1 bg-black/10 ${theme.bgClass}`}>
      {/* 검색 바 영역 */}
      <View className="mt-20 px-6 flex-row gap-2 space-x-2">
        <TextInput
          className="flex-1 h-12 bg-white/30 rounded-2xl px-4 text-black font-medium"
          placeholder="영문 도시명 입력 (ex: Jeju)"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSearch}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={handleSearch}
          className="w-12 h-12 bg-white/40 items-center justify-center rounded-2xl"
        >
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* 날씨 정보 표시 영역 */}
      <View className="flex-1 items-center justify-center pb-20">
        <Ionicons
          name={theme.iconName as any}
          size={120}
          color={condition === "Snow" ? "#333" : "white"}
        />

        <View className="items-center mt-8">
          <Text className="text-white text-3xl font-bold opacity-90">
            {weather?.name}
          </Text>
          <Text className="text-white text-9xl font-extrabold tracking-tighter my-2">
            {Math.round(weather?.main.temp)}°
          </Text>
          <Text className="text-white text-4xl font-light tracking-widest">
            {theme.title}
          </Text>
        </View>

        {/* 상세 정보 (습도 등 추가 가능) */}
        <View className="mt-10 flex-row space-x-10 gap-2 opacity-70">
          <View className="items-center">
            <Text className="text-white text-sm">습도</Text>
            <Text className="text-white text-lg font-bold">
              {weather?.main.humidity}%
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-sm">풍속</Text>
            <Text className="text-white text-lg font-bold">
              {weather?.wind.speed}m/s
            </Text>
          </View>
        </View>
      </View>

      {/* 로딩 인디케이터 (검색 중일 때만 살짝 표시) */}
      {loading && (
        <View className="absolute inset-0 bg-black/10 justify-center items-center">
          <ActivityIndicator size="small" color="white" />
        </View>
      )}
    </View>
  );
}
