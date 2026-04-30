const API_KEY = '58ebb7e32eef2e5d18f60239c74b8d33';

export const getCurrentWeather = async (
  latitude: number,
  longitude: number
) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
  );

  const data = await res.json();

  if (data.cod !== 200) {
    throw new Error(data.message || '날씨 조회 실패');
  }

  return data;
};