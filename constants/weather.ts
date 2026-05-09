export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Snow"
  | "Drizzle"
  | "Thunderstorm"
  | "Default";

interface WeatherStyle {
  iconName: string;
  bgClass: string;
  title: string;
}

export const weatherOptions: Record<WeatherCondition, WeatherStyle> = {
  Clear: {
    iconName: "sunny",
    bgClass: "bg-yellow-400",
    title: "맑음",
  },
  Clouds: {
    iconName: "cloudy",
    bgClass: "bg-gray-400",
    title: "흐림",
  },
  Rain: {
    iconName: "rainy",
    bgClass: "bg-blue-600",
    title: "비",
  },
  Snow: {
    iconName: "snow",
    bgClass: "bg-sky-100",
    title: "눈",
  },
  Drizzle: {
    iconName: "water",
    bgClass: "bg-cyan-500",
    title: "이슬비",
  },
  Thunderstorm: {
    iconName: "thunderstorm",
    bgClass: "bg-indigo-900",
    title: "뇌우",
  },
  Default: {
    iconName: "help-circle",
    bgClass: "bg-emerald-500",
    title: "확인 중",
  },
};
