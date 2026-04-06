import { Text, View } from "react-native";

interface Props {
  text: string;
  top: number;
  left: number;
  rotate: string;
}
export default function DecorativeText({ text, top, left, rotate }: Props) {
  return (
    <View
      style={{
        position: "absolute",
        top,
        left,
        transform: [{ rotate }],
      }}
    >
      <Text className="text-black text-[200px]">{text}</Text>
    </View>
  );
}
