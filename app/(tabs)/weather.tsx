import { Gaegu_400Regular, useFonts } from '@expo-google-fonts/gaegu';
import { IslandMoments_400Regular } from '@expo-google-fonts/island-moments';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type GeocodingResult = {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

type GeocodingResponse = {
  results?: GeocodingResult[];
};

type NominatimResult = {
  display_name: string;
  lat: string;
  lon: string;
};

type Location = {
  place: string;
  latitude: number;
  longitude: number;
};

type CurrentWeather = {
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
};

type ForecastResponse = {
  current: CurrentWeather;
};

type WeatherState = {
  place: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
};

const DEFAULT_CITY = '서울';

const weatherDescriptions: Record<number, string> = {
  0: '맑음',
  1: '대체로 맑음',
  2: '구름 조금',
  3: '흐림',
  45: '안개',
  48: '서리 안개',
  51: '약한 이슬비',
  53: '이슬비',
  55: '강한 이슬비',
  61: '약한 비',
  63: '비',
  65: '강한 비',
  71: '약한 눈',
  73: '눈',
  75: '강한 눈',
  80: '약한 소나기',
  81: '소나기',
  82: '강한 소나기',
  95: '천둥번개',
};

const koreanCityAliases: Record<string, string> = {
  서울: 'Seoul',
  서울시: 'Seoul',
  서울특별시: 'Seoul',
  부산: 'Busan',
  부산시: 'Busan',
  부산광역시: 'Busan',
  대구: 'Daegu',
  대구시: 'Daegu',
  대구광역시: 'Daegu',
  인천: 'Incheon',
  인천시: 'Incheon',
  인천광역시: 'Incheon',
  광주: 'Gwangju',
  광주시: 'Gwangju',
  광주광역시: 'Gwangju',
  대전: 'Daejeon',
  대전시: 'Daejeon',
  대전광역시: 'Daejeon',
  울산: 'Ulsan',
  울산시: 'Ulsan',
  울산광역시: 'Ulsan',
  세종: 'Sejong',
  세종시: 'Sejong',
  제주: 'Jeju',
  제주시: 'Jeju',
  춘천: 'Chuncheon',
  원주: 'Wonju',
  강릉: 'Gangneung',
  수원: 'Suwon',
  성남: 'Seongnam',
  용인: 'Yongin',
  고양: 'Goyang',
  부천: 'Bucheon',
  안산: 'Ansan',
  안양: 'Anyang',
  남양주: 'Namyangju',
  화성: 'Hwaseong',
  평택: 'Pyeongtaek',
  의정부: 'Uijeongbu',
  파주: 'Paju',
  김포: 'Gimpo',
  청주: 'Cheongju',
  충주: 'Chungju',
  천안: 'Cheonan',
  아산: 'Asan',
  전주: 'Jeonju',
  군산: 'Gunsan',
  익산: 'Iksan',
  목포: 'Mokpo',
  여수: 'Yeosu',
  순천: 'Suncheon',
  포항: 'Pohang',
  경주: 'Gyeongju',
  구미: 'Gumi',
  창원: 'Changwon',
  진주: 'Jinju',
  김해: 'Gimhae',
  양산: 'Yangsan',
  거제: 'Geoje',
};

function getWeatherDescription(code: number) {
  return weatherDescriptions[code] ?? '날씨 정보';
}

function getLocationQueries(cityName: string) {
  const compactCity = cityName.replace(/\s/g, '');
  const alias = koreanCityAliases[compactCity];
  const queries = alias ? [cityName, alias] : [cityName];

  return [...new Set(queries)];
}

async function findLocationFromOpenMeteo(cityName: string): Promise<Location | null> {
  const queries = getLocationQueries(cityName);

  for (const query of queries) {
    const geocodingUrl =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}` +
      '&count=1&language=ko&format=json';
    const geocodingResponse = await fetch(geocodingUrl);

    if (!geocodingResponse.ok) {
      continue;
    }

    const geocodingData = (await geocodingResponse.json()) as GeocodingResponse;
    const location = geocodingData.results?.[0];

    if (location) {
      const placeParts = [location.name, location.admin1, location.country].filter(Boolean);

      return {
        place: placeParts.join(', '),
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }
  }

  return null;
}

async function findLocationFromOpenStreetMap(cityName: string): Promise<Location | null> {
  const searchQuery = `${cityName}, 대한민국`;
  const nominatimUrl =
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}` +
    '&format=json&limit=1&accept-language=ko';
  const nominatimResponse = await fetch(nominatimUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!nominatimResponse.ok) {
    return null;
  }

  const results = (await nominatimResponse.json()) as NominatimResult[];
  const result = results[0];

  if (!result) {
    return null;
  }

  return {
    place: result.display_name.split(',').slice(0, 3).join(', '),
    latitude: Number(result.lat),
    longitude: Number(result.lon),
  };
}

async function findLocation(cityName: string) {
  return (
    (await findLocationFromOpenMeteo(cityName)) ??
    (await findLocationFromOpenStreetMap(cityName))
  );
}

export default function WeatherScreen() {
  const [fontsLoaded] = useFonts({
    gaegu: Gaegu_400Regular,
    'island-moments': IslandMoments_400Regular,
  });
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeather = useCallback(async (cityName: string) => {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
      setErrorMessage('도시 이름을 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const location = await findLocation(trimmedCity);

      if (!location) {
        throw new Error('검색 결과가 없어요. 다른 도시 이름을 입력해 주세요.');
      }

      const forecastUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}` +
        '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto';
      const forecastResponse = await fetch(forecastUrl);

      if (!forecastResponse.ok) {
        throw new Error('날씨 정보를 가져오지 못했어요.');
      }

      const forecastData = (await forecastResponse.json()) as ForecastResponse;
      const current = forecastData.current;

      setWeather({
        place: location.place,
        temperature: Math.round(current.temperature_2m),
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        description: getWeatherDescription(current.weather_code),
      });
    } catch (error) {
      setWeather(null);
      setErrorMessage(error instanceof Error ? error.message : '잠시 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, [fetchWeather]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          onSubmitEditing={() => fetchWeather(city)}
          placeholder="도시 이름"
          placeholderTextColor="rgba(96, 43, 255, 0.45)"
          autoCapitalize="words"
          returnKeyType="search"
        />
        <Pressable style={styles.searchButton} onPress={() => fetchWeather(city)}>
          <Text style={styles.searchButtonText}>검색</Text>
        </Pressable>
      </View>

      <View style={styles.weatherPanel}>
        {isLoading ? (
          <ActivityIndicator color="#602BFF" size="large" />
        ) : weather ? (
          <>
            <Text style={styles.place}>{weather.place}</Text>
            <Text style={styles.temperature}>{weather.temperature}°C</Text>
            <Text style={styles.description}>{weather.description}</Text>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>습도</Text>
                <Text style={styles.detailValue}>{weather.humidity}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>바람</Text>
                <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0FF',
    paddingHorizontal: 24,
    paddingTop: 44,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#602BFF',
    fontFamily: 'island-moments',
    fontSize: 64,
    lineHeight: 72,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  input: {
    flex: 1,
    height: 52,
    borderWidth: 2,
    borderColor: '#602BFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#28115F',
    backgroundColor: '#FFF',
    fontFamily: 'gaegu',
    fontSize: 20,
  },
  searchButton: {
    height: 52,
    minWidth: 76,
    borderRadius: 12,
    backgroundColor: '#602BFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: '#FFF',
    fontFamily: 'gaegu',
    fontSize: 20,
  },
  weatherPanel: {
    minHeight: 300,
    borderRadius: 8,
    backgroundColor: '#FFF',
    padding: 24,
    justifyContent: 'center',
    shadowColor: '#28115F',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  place: {
    color: '#28115F',
    fontFamily: 'gaegu',
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
  },
  temperature: {
    color: '#602BFF',
    fontFamily: 'gaegu',
    fontSize: 78,
    lineHeight: 88,
    textAlign: 'center',
    marginTop: 12,
  },
  description: {
    color: '#5C4D86',
    fontFamily: 'gaegu',
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 12,
  },
  detailItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E4D9FF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  detailLabel: {
    color: '#8F82B8',
    fontFamily: 'gaegu',
    fontSize: 18,
  },
  detailValue: {
    color: '#28115F',
    fontFamily: 'gaegu',
    fontSize: 24,
    marginTop: 4,
  },
  errorText: {
    color: '#D33A3A',
    fontFamily: 'gaegu',
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
  },
});
