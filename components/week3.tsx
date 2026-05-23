import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTodoList } from "./hooks/useTodoList";
import { TodoItem } from "./TodoItem";
import { colors, styles } from "./week3Styles";

export default function Week3Screen() {
  const { items, doneCount, addItem, toggleItem, removeItem, clearDone } =
    useTodoList();
  const [input, setInput] = useState("");

  // 아이템별 fade-in 애니메이션 값을 Map으로 관리
  const fadeAnims = useRef<Map<string, Animated.Value>>(new Map()).current;

  const getOrCreateFadeAnim = (id: string): Animated.Value => {
    if (!fadeAnims.has(id)) {
      const anim = new Animated.Value(0);
      fadeAnims.set(id, anim);
      // 새로 생성된 경우 fade-in 실행
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
    return fadeAnims.get(id)!;
  };

  const handleAdd = () => {
    addItem(input);
    setInput("");
  };

  const handleRemove = (id: string) => {
    fadeAnims.delete(id); // 메모리 정리
    removeItem(id);
  };

  const handleClearDone = () => {
    // 완료된 항목 anim 정리
    items.filter((i) => i.done).forEach((i) => fadeAnims.delete(i.id));
    clearDone();
  };

  // 날짜, 요일
  const today = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일 ${days[today.getDay()]}요일`;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>MY TODOLIST</Text>
          <Text style={styles.headerTitle}>할 일 목록</Text>
          <Text style={styles.headerSub}>
            {items.length}개 항목 · {doneCount}개 완료
          </Text>
        </View>

        <Text style={styles.dateText}>{dateString}</Text>

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleAdd}
            placeholder="항목을 입력하세요"
            placeholderTextColor={colors.blueLight}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
            <Text style={styles.addButtonText}>추가</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>할 일을 입력하세요 ✍️</Text>
          )}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              fadeAnim={getOrCreateFadeAnim(item.id)}
              onToggle={() => toggleItem(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
        />

        {items.length > 0 && (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "수고했어요!🥳",
                  "완료된 할 일을 모두 삭제하시겠습니까?",
                  [
                    { text: "아니오", style: "cancel" },
                    { text: "예", onPress: handleClearDone },
                  ],
                );
              }}
            >
              <Text style={styles.clearButton}>완료 삭제</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
