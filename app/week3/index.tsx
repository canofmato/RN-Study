import { useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./styles";

type WishItem = {
  id: string;
  text: string;
  done: boolean;
};

export default function Week3Screen() {
  const [items, setItems] = useState<WishItem[]>([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input.trim(), done: false },
    ]);
    setInput("");
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearDone = () => {
    setItems((prev) => prev.filter((item) => !item.done));
  };

  const doneCount = items.filter((i) => i.done).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* 네이비 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>MY TODOLIST</Text>
          <Text style={styles.headerTitle}>할 일 목록</Text>
          <Text style={styles.headerSub}>
            {items.length}개 항목 · {doneCount}개 완료
          </Text>
        </View>

        {/* 입력창 */}
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addItem}
            placeholder="항목을 입력하세요"
            placeholderTextColor={colors.blueLight}
            style={styles.input}
          />
          <TouchableOpacity onPress={addItem} style={styles.addButton}>
            <Text style={styles.addButtonText}>추가</Text>
          </TouchableOpacity>
        </View>

        {/* 목록 */}
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              {/* 체크 버튼 */}
              <TouchableOpacity
                onPress={() => toggleItem(item.id)}
                style={[
                  styles.checkButton,
                  {
                    borderWidth: item.done ? 0 : 1.5,
                    backgroundColor: item.done ? colors.blueMid : "transparent",
                  },
                ]}
              >
                {item.done && <Text style={styles.checkText}>✓</Text>}
              </TouchableOpacity>

              {/* 텍스트 */}
              <Text
                style={[
                  styles.itemText,
                  {
                    color: item.done ? colors.blueLight : colors.navy,
                    textDecorationLine: item.done ? "line-through" : "none",
                  },
                ]}
              >
                {item.text}
              </Text>

              {/* 삭제 버튼 */}
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Text style={styles.deleteButton}>×</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* 하단 바 */}
        {items.length > 0 && (
          <View style={styles.footer}>
            <TouchableOpacity onPress={clearDone}>
              <Text style={styles.clearButton}>완료 삭제</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
