import { getCurrentWeather } from '@/src/apis/weatherApi';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import SunnyIcon from '@/assets/images/sunny-icon.svg';
import CloudyIcon from '@/assets/images/cloudy-icon.svg';
import RainyIcon from '@/assets/images/rainy-icon.svg';
import WindyIcon from '@/assets/images/windy-icon.svg';

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWeather = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setWeather(null);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const data = await getCurrentWeather(latitude, longitude);

      setWeather(data);
      setCurrentTime(getCurrentTime());
    } catch (error) {
      console.log('날씨 조회 실패:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#4f7cff]">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="mt-3 text-white">날씨 불러오는 중...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View className="flex-1 items-center justify-center bg-[#4f7cff]">
        <Text className="mb-4 text-lg font-bold text-white">
          날씨 불러오기 실패
        </Text>

        <Pressable
          className="rounded-full bg-white px-5 py-2"
          onPress={getWeather}
        >
          <Text className="font-bold text-[#4f7cff]">다시 시도</Text>
        </Pressable>
      </View>
    );
  }

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const description = weather.weather[0].description;
  const getWeatherSvgIcon = (main: string, windSpeed: number) => {
    if (windSpeed >= 7) {
      return <WindyIcon width={130} height={130} />;
    }

    switch (main) {
      case 'Clear':
        return <SunnyIcon width={130} height={130} />;

      case 'Clouds':
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return <CloudyIcon width={130} height={130} />;

      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        return <RainyIcon width={130} height={130} />;

      default:
        return <CloudyIcon width={130} height={130} />;
    }
  };

  return (
    <View
      className="flex-1 px-6 pt-[60px]"
      style={{ backgroundColor: 'rgba(20,35,70,0.5)' }}
    >
      <View className="mb-8 flex-row items-center justify-between">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </Pressable>

        <Text className="text-lg font-bold text-white">Weather</Text>

        <Pressable onPress={getWeather}>
          <Ionicons name="refresh" size={24} color="white" />
        </Pressable>
      </View>

      <View className="items-center rounded-[32px] border border-white/35 bg-white/20 px-6 py-[30px]">
        <Text className="text-3xl font-extrabold text-white">
          {weather.name}
        </Text>

        <Text className="mt-1 text-sm text-white/80">오늘 {currentTime}</Text>

        <View className="mt-6 items-center justify-center">
          {getWeatherSvgIcon(weather.weather[0].main, weather.wind.speed)}
        </View>

        <Text className="mt-4 text-[70px] font-thin text-white">{temp}°</Text>

        <Text className="text-xl font-semibold text-white">{description}</Text>
      </View>

      <View className="mt-8 flex-row flex-wrap justify-between">
        <InfoCard
          icon="thermometer"
          label="체감온도"
          value={`${feelsLike}°C`}
        />

        <InfoCard
          icon="water"
          label="습도"
          value={`${weather.main.humidity}%`}
        />

        <InfoCard
          icon="speedometer"
          label="풍속"
          value={`${weather.wind.speed} m/s`}
        />

        <InfoCard
          icon="cloud"
          label="기압"
          value={`${weather.main.pressure} hPa`}
        />
      </View>
    </View>
  );
}

const InfoCard = ({ icon, label, value }: any) => {
  return (
    <View className="mb-3 w-[48%] items-center rounded-2xl bg-white/90 px-4 py-4">
      <Ionicons name={icon} size={22} color="#4f7cff" />

      <Text className="mt-2 text-xs text-gray-500">{label}</Text>

      <Text className="mt-1 text-lg font-bold text-[#1f2a44]">
        {value}
      </Text>
    </View>
  );
};