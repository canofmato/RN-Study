import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Barcode from "../assets/images/Barcode.svg";
import CartMini from "../assets/images/CartMini.svg";
import ChevronLeft from "../assets/images/Chevron-left.svg";
import Delete from "../assets/images/Delete.svg";
import ShoppingCart from "../assets/images/Shopping-cart.svg";
import { useWish } from "../context/WishContext";

export default function WishDetailScreen() {
  const router = useRouter();
  const { deleteWish } = useWish();
  const { id, emoji, title, description, isDone } = useLocalSearchParams();

  const handleDelete = () => {
    // 1. 현재 상세 페이지의 id를 숫자로 변환하여 삭제 실행
    deleteWish(Number(id));

    // 2. 삭제 후 메인 페이지로 이동 (모달이 열린 상태로 가고 싶다면 파라미터 추가)
    router.replace({
      pathname: "/wish",
      params: { openModal: "true" },
    });
  };

  return (
    <View className="flex-1 flex-col gap-[50px] py-[60px] bg-wish/50 items-center justify-start">
      {/* header */}
      <View className="w-full flex-row pl-5 py-4 pr-[30px] items-center justify-between">
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: "/wish",
              params: { openModal: "true" },
            })
          }
          activeOpacity={0.7}
        >
          <ChevronLeft width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ShoppingCart width={30} height={30} />
        </TouchableOpacity>
      </View>

      {/* main */}
      <View className="w-[330px] h-[590px] flex-col gap-5 px-8 py-5 bg-white rounded-[30px] items-center justify-center">
        <CartMini width={120} height={120} />
        <View className="w-full flex-col gap-3 py-3">
          {/* top */}
          <View className="w-full flex-col gap-3">
            <Text className="text-heading4 text-black font-medium">
              **************** MY WISH ****************
            </Text>
            <Text className="text-heading4 text-black">
              Date: 29-Dec-2026 00:00:00{"\n"}
              Terminal: canofmato{"\n"}
              Served by: canofmato{"\n"}
            </Text>
            <Text className="text-heading4 text-black font-medium">
              *******************************************
            </Text>
          </View>

          {/* content */}
          <View className="w-full flex-col gap-2">
            <View className="w-full flex-row items-center justify-between">
              <Text className="text-heading4 text-black text-start">
                EMOJI:
              </Text>
              <Text className="text-heading4 text-black text-end">{emoji}</Text>
            </View>

            <View className="w-full flex-row items-center justify-between">
              <Text className="text-heading4 text-black text-start">WISH:</Text>
              <Text className="text-heading4 text-black text-end">{title}</Text>
            </View>

            <View className="w-full flex-row items-center justify-between">
              <Text className="text-heading4 text-black text-start">
                DETAIL:
              </Text>
              <Text className="text-heading4 text-black text-end">
                {description}
              </Text>
            </View>
          </View>

          {/* bottom */}
          <View className="w-full flex-col gap-1 items-center justify-center">
            <Text className="text-heading4 text-black font-medium">
              *******************************************
            </Text>
            <View className="w-full flex-row items-center justify-between">
              <Text className="text-heading4 text-black font-medium">
                CURRENT STATUS
              </Text>
              <Text className="text-heading4 text-black font-medium">
                {isDone}
              </Text>
            </View>
            <Text className="text-heading4 text-black font-medium">
              *******************************************
            </Text>
          </View>
          <Barcode width={266} />

          <TouchableOpacity
            className="w-full items-center"
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Delete width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
