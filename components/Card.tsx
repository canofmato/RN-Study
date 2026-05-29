import { useWish } from "@/context/WishContext";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Goto from "../assets/images/Arrowup-right.svg";
import Check from "../assets/images/Check.svg";
import Delete from "../assets/images/Delete.svg";

interface CardProps {
  id: number;
  emoji: string;
  title: string;
  description: string;
  isDone?: boolean;
  onToggle?: () => void;
  onCloseModal: () => void;
}

export default function Card({
  id,
  emoji,
  title,
  description,
  isDone,
  onToggle,
  onCloseModal,
}: CardProps) {
  const router = useRouter();
  const { deleteWish } = useWish();

  const panX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },

      onPanResponderMove: (_, gestureState) => {
        const newX = Math.min(0, Math.max(-70, gestureState.dx));
        panX.setValue(newX);
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          Animated.spring(panX, {
            toValue: -70,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(panX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleGoDetail = () => {
    onCloseModal();

    router.push({
      pathname: "/wishDetail", // 실제 파일 경로에 맞춰주세요
      params: {
        id: id.toString(),
        emoji,
        title,
        description,
        isDone: isDone ? "DONE" : "PENDING",
      },
    });
  };

  const handleDelete = () => {
    deleteWish(id);
  };

  return (
    <View className="relative w-[302px] h-[60px] bg-white rounded-[15px] overflow-hidden border border-1.5 border-wishLight">
      <View className="absolute right-0 h-full justify-center items-end pr-4">
        <TouchableOpacity onPress={handleDelete} activeOpacity={0.7}>
          <Delete width={24} height={24} />
        </TouchableOpacity>
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateX: panX }] }}
        className="w-full h-full flex-row px-4 bg-white items-center justify-between rounded-[15px]"
      >
        <View className="flex-row gap-2 items-center justify-center">
          <Pressable
            onPress={onToggle}
            className={`w-[25px] h-[25px] rounded-full border border-1.5 border-wishLight items-center justify-center ${isDone ? "bg-wishLight" : "bg-transparent"}`}
          >
            {isDone && <Check width={20} height={20} />}
          </Pressable>
          <Text className="text-heading3 text-medium text-black">{title}</Text>
        </View>

        <Pressable hitSlop={10} onPress={handleGoDetail}>
          <Goto width={24} height={24} />
        </Pressable>
      </Animated.View>
    </View>
  );
}
