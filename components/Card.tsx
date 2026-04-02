import { Pressable, Text, View } from "react-native";
import Goto from "../assets/images/Arrowup-right.svg";
import Check from "../assets/images/Check.svg";

interface CardProps {
  title: string;
  isDone?: boolean;
  onToggle?: () => void;
}

export default function Card({ title, isDone, onToggle }: CardProps) {
  return (
    <View className="w-[302px] h-[60px] flex-row px-4 items-center justify-between rounded-[15px] border border-1.5 border-wishLight">
      <View className="flex-row gap-2 items-center justify-center">
        <Pressable
          onPress={onToggle}
          className={`w-[25px] h-[25px] rounded-full border border-1.5 border-wishLight items-center justify-center ${isDone ? "bg-wishLight" : "bg-transparent"}`}
        >
          {isDone && <Check width={20} height={20} />}
        </Pressable>
        <Text className="text-heading3 text-medium text-black">{title}</Text>
      </View>

      <Pressable hitSlop={10}>
        <Goto width={24} height={24} />
      </Pressable>
    </View>
  );
}
