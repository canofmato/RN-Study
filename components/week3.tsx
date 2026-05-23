import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTodoList } from "./hooks/useTodoList";
import { colors, styles } from "./week3Styles";

export default function Week3Screen() {
  const { items, doneCount, addItem, toggleItem, removeItem, clearDone } =
    useTodoList();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    addItem(input);
    setInput("");
  };

  // 날짜, 요일!
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
            <View style={styles.listItem}>
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

              <TouchableOpacity
                onPress={() => {
                  if (!item.done) {
                    Alert.alert(
                      "아직 완료하지 않았어요🤔",
                      `'${item.text}'를 정말 삭제하시겠습니까?`,
                      [
                        { text: "아니오", style: "cancel" },
                        { text: "예", onPress: () => removeItem(item.id) },
                      ],
                    );
                  } else {
                    removeItem(item.id);
                  }
                }}
              >
                <Text style={styles.deleteButton}>×</Text>
              </TouchableOpacity>
            </View>
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
                    { text: "예", onPress: clearDone },
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
