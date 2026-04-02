import WishList from "@/components/WishList";
import WishModal from "@/components/WishModal";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
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

  const handleAddWish = (data: {
    emoji: string;
    title: string;
    description: string;
  }) => {
    const newWish: WishItem = {
      id: Date.now(),
      ...data,
      isDone: false,
      // top: Math.floor(Math.random() * 186) + 60,
      // left: Math.floor(Math.random() * 300) + 70,
      top: Math.floor(Math.random() * 300) + 200,
      left: Math.floor(Math.random() * 300) + 50,
      rotate: `${Math.floor(Math.random() * 60) - 30}deg`,
    };

    setWishList([...wishList, newWish]);
    setIsModalOpen(false);
  };

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
          className="absolute right-[20px] top-[70px] w-[50px] h-[50px] items-center justify-center"
          hitSlop={20}
        >
          <Home width={30} height={30} />
        </Pressable>
      </Link>

      <Text
        className="absolute text-[200px] text-black left-[149px] top-[42px]"
        style={{ transform: [{ rotate: "-20deg" }] }}
      >
        L
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[308px] top-[317px]"
        style={{ transform: [{ rotate: "-6deg" }] }}
      >
        E
      </Text>
      <Cart
        width={440}
        height={306}
        style={{ transform: [{ rotate: "-85deg" }] }}
      />
      <Text
        className="absolute text-[200px] text-black left-[-13px] top-[83px]"
        style={{ transform: [{ rotate: "-11deg" }] }}
      >
        F
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[86px] top-[37px]"
        style={{ transform: [{ rotate: "2deg" }] }}
      >
        I
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[273px] top-[65px]"
        style={{ transform: [{ rotate: "-11deg" }] }}
      >
        L
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[-39px] top-[273px]"
        style={{ transform: [{ rotate: "15deg" }] }}
      >
        T
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[-42px] top-[427px]"
        style={{ transform: [{ rotate: "20deg" }] }}
      >
        H
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[-36px] top-[610px]"
        style={{ transform: [{ rotate: "-18deg" }] }}
      >
        C
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[73px] top-[646px]"
        style={{ transform: [{ rotate: "-17deg" }] }}
      >
        A
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[160px] top-[586px]"
        style={{ transform: [{ rotate: "-23deg" }] }}
      >
        R
      </Text>
      <Text
        className="absolute text-[200px] text-black left-[285px] top-[629px]"
        style={{ transform: [{ rotate: "5deg" }] }}
      >
        T
      </Text>

      {wishList.map((item) => (
        <Text
          key={item.id}
          className="absolute text-[100px]"
          style={{
            top: item.top,
            left: item.left,
            transform: [{ rotate: item.rotate }],
          }}
        >
          {item.emoji}
        </Text>
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
