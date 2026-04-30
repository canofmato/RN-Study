import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Goto from "../assets/images/Arrowup-right.svg";
import Check from "../assets/images/Check.svg";

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

      <Pressable hitSlop={10} onPress={handleGoDetail}>
        <Goto width={24} height={24} />
      </Pressable>
    </View>
  );
}
