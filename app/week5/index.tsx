import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_KEY = "1ed003a53147f9aa3fd66aedc9a62c8a";
const CITY = "Seoul";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=kr`;

type WeatherData = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
};

type OpenWeatherError = {
  cod?: number | string;
  message?: string;
};

export default function Week5Screen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeather = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch(WEATHER_URL);
      const data = (await response.json()) as WeatherData | OpenWeatherError;

      if (!response.ok) {
        const apiMessage =
          "message" in data && data.message
            ? data.message
            : "날씨 정보를 불러오지 못했습니다.";

        throw new Error(`API 오류(${response.status}): ${apiMessage}`);
      }

      const weatherData = data as WeatherData;

      if (
        !weatherData.name ||
        !weatherData.main ||
        !weatherData.weather?.[0] ||
        !weatherData.wind
      ) {
        throw new Error("날씨 데이터 형식이 올바르지 않습니다.");
      }

      setWeather(weatherData);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

      setWeather(null);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const description = weather?.weather[0]?.description ?? "";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.badge}>Week 5</Text>
        <Text style={styles.title}>OpenWeather API</Text>
        <Text style={styles.subtitle}>서울의 현재 날씨를 가져왔어요.</Text>

        <View style={styles.card}>
          {isLoading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loadingText}>날씨 정보를 불러오는 중...</Text>
            </View>
          ) : errorMessage ? (
            <View style={styles.centerContent}>
              <Text style={styles.errorTitle}>불러오기 실패</Text>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : weather ? (
            <>
              <Text style={styles.city}>{weather.name}</Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.temperature}>
                {Math.round(weather.main.temp)}°C
              </Text>

              <View style={styles.infoList}>
                <InfoRow
                  label="체감 온도"
                  value={`${Math.round(weather.main.feels_like)}°C`}
                />
                <InfoRow label="습도" value={`${weather.main.humidity}%`} />
                <InfoRow label="풍속" value={`${weather.wind.speed} m/s`} />
              </View>

              <Pressable style={styles.refreshButton} onPress={fetchWeather}>
                <Text style={styles.refreshButtonText}>새로고침</Text>
              </Pressable>
            </>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e0f2fe",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#bfdbfe",
    paddingHorizontal: 14,
    paddingVertical: 6,
    color: "#1e40af",
    fontSize: 14,
    fontWeight: "700",
  },
  title: {
    marginTop: 16,
    color: "#0f172a",
    fontSize: 32,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 28,
    color: "#475569",
    fontSize: 16,
  },
  card: {
    minHeight: 360,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    padding: 26,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 14,
    color: "#475569",
    fontSize: 16,
  },
  errorTitle: {
    color: "#dc2626",
    fontSize: 22,
    fontWeight: "800",
  },
  errorText: {
    marginTop: 10,
    color: "#64748b",
    fontSize: 15,
    textAlign: "center",
  },
  helpText: {
    marginTop: 8,
    color: "#94a3b8",
    fontSize: 13,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  city: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "800",
  },
  description: {
    marginTop: 6,
    color: "#2563eb",
    fontSize: 18,
    fontWeight: "700",
  },
  temperature: {
    marginTop: 20,
    color: "#0f172a",
    fontSize: 72,
    fontWeight: "900",
  },
  infoList: {
    marginTop: 18,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 10,
  },
  infoLabel: {
    color: "#64748b",
    fontSize: 16,
  },
  infoValue: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  refreshButton: {
    alignItems: "center",
    marginTop: 26,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    paddingVertical: 13,
  },
  refreshButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
