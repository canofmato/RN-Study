import DecorativeText from "@/components/DecorativeText";
import WishList from "@/components/WishList";
import WishModal from "@/components/WishModal";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Cart from "../assets/images/Cart.svg";
import Home from "../assets/images/Home.svg";
import Plus from "../assets/images/Plus.svg";

interface WishItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  isDone: boolean;
  top: number;
  left: number;
  rotate: string;
}

export default function WishScreen() {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [wishList, setWishList] = useState<WishItem[]>([]);

  const { width, height } = useWindowDimensions();

  const EMOJI_SIZE = 100;
  const BOX_WIDTH = 306;
  const BOX_HEIGHT = 440;

  const handleAddWish = (data: {
    emoji: string;
    title: string;
    description: string;
  }) => {
    const centerX = width / 2;
    const centerY = height / 2;

    const minLeft = centerX - BOX_WIDTH / 2;
    const minTop = centerY - BOX_HEIGHT / 2;

    const newWish: WishItem = {
      id: Date.now(),
      ...data,
      isDone: false,
      top: Math.floor(Math.random() * (BOX_HEIGHT - EMOJI_SIZE)) + minTop,
      left: Math.floor(Math.random() * (BOX_WIDTH - EMOJI_SIZE)) + minLeft,
      rotate: `${Math.floor(Math.random() * 60) - 30}deg`,
    };

    setWishList([...wishList, newWish]);
    setIsModalOpen(false);
  };

  // const handleAddWish = (data: {
  //   emoji: string;
  //   title: string;
  //   description: string;
  // }) => {
  //   const newWish: WishItem = {
  //     id: Date.now(),
  //     ...data,
  //     isDone: false,
  //     top: Math.floor(Math.random() * 300) + 200,
  //     left: Math.floor(Math.random() * 270) + 50,
  //     rotate: `${Math.floor(Math.random() * 60) - 30}deg`,
  //   };

  //   setWishList([...wishList, newWish]);
  //   setIsModalOpen(false);
  // };

  const wishDone = (id: number) => {
    setWishList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  return (
    <View className="relative flex-1 bg-white items-center justify-center">
      <Link href={"/"} asChild>
        <Pressable
          style={{
            position: "absolute",
            right: 30,
            top: 70,
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          hitSlop={20}
        >
          <Home width={30} height={30} />
        </Pressable>
      </Link>

      <DecorativeText text="L" top={42} left={149} rotate=" -20deg" />
      <DecorativeText text="E" top={317} left={308} rotate=" -6deg" />
      <Cart
        width={440}
        height={306}
        style={{ transform: [{ rotate: "-85deg" }] }}
      />
      <DecorativeText text="F" top={83} left={-13} rotate=" -11deg" />
      <DecorativeText text="I" top={37} left={86} rotate=" 2deg" />
      <DecorativeText text="L" top={65} left={273} rotate=" -11deg" />
      <DecorativeText text="T" top={273} left={-39} rotate=" 15deg" />
      <DecorativeText text="H" top={427} left={-42} rotate=" -20deg" />
      <DecorativeText text="C" top={610} left={-36} rotate=" -18deg" />
      <DecorativeText text="A" top={646} left={73} rotate=" -17deg" />
      <DecorativeText text="R" top={586} left={160} rotate=" -23deg" />
      <DecorativeText text="T" top={629} left={285} rotate=" 5deg" />

      {wishList.map((item) => (
        <View
          key={item.id}
          style={{
            position: "absolute",
            top: item.top,
            left: item.left,
            transform: [{ rotate: item.rotate }],
          }}
        >
          <Text className="text-[100px] text-black">{item.emoji}</Text>
        </View>
      ))}

      {showMenu && (
        <View className="absolute left-[160px] top-[640px] w-[160px] rounded-[30px] py-3 flex-column items-center justify-center gap-3">
          <Pressable
            className="bg-wish/80 active:bg-wish w-full px-[23px] py-[9px] items-center rounded-full"
            onPress={() => {
              setIsModalOpen(true);
              setShowMenu(false);
            }}
          >
            <Text className="text-white font-semibold text-heading1">
              Add Wish
            </Text>
          </Pressable>

          <Pressable
            className="bg-wish/80 active:bg-wish w-full px-[23px] py-[9px] items-center rounded-full"
            onPress={() => {
              setIsListOpen(true);
              setShowMenu(false);
            }}
          >
            <Text className="text-white font-semibold text-heading1">
              View Wish
            </Text>
          </Pressable>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setShowMenu(!showMenu)}
        className="absolute w-[70px] h-[70px] rounded-full bg-wish items-center justify-center left-[245px] top-[770px]"
      >
        <Plus width={40} height={40} />
      </TouchableOpacity>

      <WishModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddWish}
      />

      <WishList
        visible={isListOpen}
        items={wishList}
        onClose={() => setIsListOpen(false)}
        onToggleItem={wishDone}
      />
    </View>
  );
}
