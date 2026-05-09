import { useEffect, useState } from "react";

const API_KEY = "693a928a050260ea2233fa146be6f07e";
const BASE = "https://api.openweathermap.org/data/2.5/weather";

const getIcon = (code: number) => {
  if (code >= 200 && code < 300) return "⛈️";
  if (code >= 300 && code < 600) return "🌧️";
  if (code >= 600 && code < 700) return "❄️";
  if (code === 800) return "☀️";
  if (code > 800) return "☁️";
  return "🌡️";
};

export default function useWeather(city: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${BASE}?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("도시를 찾을 수 없어요");
        const json = await res.json();
        console.log("전체 응답:", json);
        console.log("wind:", json.wind);
        console.log("visibility:", json.visibility);
        console.log("humidity:", json.main.humidity);

        setData({
          name: json.name,
          country: json.sys.country,
          temp: Math.round(json.main.temp),
          feelsLike: Math.round(json.main.feels_like),
          max: Math.round(json.main.temp_max),
          min: Math.round(json.main.temp_min),
          humidity: json.main.humidity ?? "--",
          wind: json.wind?.speed?.toFixed(1) ?? "--",
          visibility: json.visibility
            ? Math.round(json.visibility / 1000)
            : "--",
          desc: json.weather[0].description,
          icon: getIcon(json.weather[0].id),
          sunrise: new Date(json.sys.sunrise * 1000).toLocaleTimeString(
            "ko-KR",
            { hour: "2-digit", minute: "2-digit" },
          ),
          sunset: new Date(json.sys.sunset * 1000).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          uvi: "—", // 기본 API엔 없어서 일단 표시
          pop: 0, // 기본 API엔 없어서 일단 0
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, loading, error };
}
