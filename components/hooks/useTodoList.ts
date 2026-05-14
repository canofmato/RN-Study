import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type WishItem = {
  id: string;
  text: string;
  done: boolean;
};

export function useTodoList() {
  const [items, setItems] = useState<WishItem[]>([]);

  // 앱 시작 시 저장된 데이터 불러오기
  useEffect(() => {
    const load = async () => {
      try {
        const json = await AsyncStorage.getItem("todoList");
        if (json !== null) setItems(JSON.parse(json));
      } catch (e) {
        console.error("불러오기 실패", e);
      }
    };
    load();
  }, []);

  // items 바뀔 때마다 저장
  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem("todoList", JSON.stringify(items));
      } catch (e) {
        console.error("저장 실패", e);
      }
    };
    save();
  }, [items]);

  const addItem = (text: string) => {
    if (!text.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), text: text.trim(), done: false },
    ]);
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

  return { items, doneCount, addItem, toggleItem, removeItem, clearDone };
}
