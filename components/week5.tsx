import React, { useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import useWeather from "./hooks/useWeather";

export default function Week5() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Seoul");
  const { data, loading, error } = useWeather(city);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container}>
        {/* 검색 */}
        <View style={s.row}>
          <TextInput
            style={s.input}
            placeholder="도시 이름을 입력해 주세요"
            placeholderTextColor="#a0a8c0"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => input.trim() && setCity(input.trim())}
          />
          <TouchableOpacity
            style={s.btn}
            onPress={() => input.trim() && setCity(input.trim())}
          >
            <Text style={s.btnTxt}>검색</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <ActivityIndicator
            color="#4F6EF7"
            size="large"
            style={{ marginTop: 40 }}
          />
        )}
        {error && <Text style={s.error}>{error}</Text>}
        {data && !loading && !error && (
          <>
            {/* 메인 카드 */}
            <View style={s.card}>
              <Text style={s.loc}>
                {data.country} · {data.name}
              </Text>
              <Text style={s.cityName}>{city}</Text>
              <Text style={s.icon}>{data.icon}</Text>
              <Text style={s.temp}>{data.temp}°</Text>
              <Text style={s.desc}>{data.desc}</Text>
              <Text style={s.feels}>체감온도 {data.feelsLike}°C</Text>
              <View style={s.divider} />
              <View style={s.minmax}>
                <Text style={s.mmItem}>
                  최고 <Text style={s.mmVal}>{data.max}°</Text>
                </Text>
                <Text style={s.mmItem}>
                  최저 <Text style={s.mmVal}>{data.min}°</Text>
                </Text>
              </View>
            </View>

            {/* 통계 카드 3개 */}
            <View style={s.statsRow}>
              {[
                { label: "습도", value: `${data.humidity}%` },
                { label: "풍속", value: `${data.wind}m/s` },
                { label: "가시거리", value: `${data.visibility}km` },
              ].map((item) => (
                <View key={item.label} style={s.statBox}>
                  <Text style={s.statLabel}>{item.label}</Text>
                  <Text style={s.statValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            {/* 일출/일몰 카드 */}
            <View style={s.sunCard}>
              {[
                { label: "일출", value: data.sunrise },
                { label: "일몰", value: data.sunset },
                { label: "자외선", value: data.uvi },
                { label: "강수확률", value: `${data.pop}%` },
              ].map((item, idx, arr) => (
                <React.Fragment key={item.label}>
                  <View style={s.sunItem}>
                    <Text style={s.sunLabel}>{item.label}</Text>
                    <Text style={s.sunValue}>{item.value}</Text>
                  </View>
                  {idx < arr.length - 1 && <View style={s.sunDivider} />}
                </React.Fragment>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F7FF" },
  container: { padding: 20, paddingBottom: 40 },
  row: { flexDirection: "row", gap: 8, marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E4F0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#1a1a2e",
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#4F6EF7",
    borderRadius: 14,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  btnTxt: { color: "#fff", fontSize: 15 },
  error: { color: "#E24B4A", textAlign: "center", marginTop: 20 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E8ECF8",
    padding: 28,
    alignItems: "center",
    marginBottom: 16,
  },
  loc: { fontSize: 13, color: "#8892B0", letterSpacing: 0.5, marginBottom: 4 },
  cityName: {
    fontSize: 26,
    color: "#1a1a2e",
    fontWeight: "500",
    marginBottom: 12,
  },
  icon: { fontSize: 72, marginBottom: 4 },
  temp: { fontSize: 80, color: "#1a1a2e", fontWeight: "300", lineHeight: 88 },
  desc: { fontSize: 15, color: "#4F6EF7", fontWeight: "500", marginTop: 6 },
  feels: { fontSize: 12, color: "#a0a8c0", marginTop: 4 },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#F0F2FA",
    marginVertical: 14,
  },
  minmax: { flexDirection: "row", gap: 24 },
  mmItem: { fontSize: 13, color: "#5a6080" },
  mmVal: { fontWeight: "500", color: "#1a1a2e" },

  statsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E8ECF8",
    paddingVertical: 16,
    alignItems: "center",
  },
  statLabel: { fontSize: 11, color: "#a0a8c0", marginBottom: 6 },
  statValue: { fontSize: 18, color: "#1a1a2e", fontWeight: "500" },

  sunCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8ECF8",
    paddingVertical: 20,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  sunItem: { alignItems: "center", flex: 1 },
  sunLabel: { fontSize: 11, color: "#a0a8c0", marginBottom: 6 },
  sunValue: { fontSize: 14, color: "#1a1a2e", fontWeight: "500" },
  sunDivider: { width: 1, height: 36, backgroundColor: "#F0F2FA" },
});
