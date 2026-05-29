import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function Week6() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(API_URL + "/posts/1")
      .then((res) => res.json())
      .then((result) => {
        console.log("✅ ENV 성공:", result);
        console.log("API_URL:", API_URL);
        setData(result);
      })
      .catch((err) => console.log("❌ 에러:", err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔐 .env 테스트</Text>
      <Text style={styles.label}>API_URL:</Text>
      <Text style={styles.value}>{API_URL}</Text>
      <Text style={styles.label}>API_KEY:</Text>
      <Text style={styles.value}>{API_KEY}</Text>

      {data && (
        <>
          <Text style={styles.label}>📦 불러온 데이터:</Text>
          <Text style={styles.value}>{data.title}</Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
});
