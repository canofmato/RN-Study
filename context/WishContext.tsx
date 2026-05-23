import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
// 데이터 타입 정의
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

interface WishContextType {
  wishList: WishItem[];
  setWishList: React.Dispatch<React.SetStateAction<WishItem[]>>;
  addWish: (data: any) => void;
  toggleWish: (id: number) => void;
  deleteWish: (id: number) => void;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export function WishProvider({ children }: { children: React.ReactNode }) {
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 앱 시작시 데이터 불러오기
  useEffect(() => {
    const loadWishes = async () => {
      try {
        const savedWishes = await AsyncStorage.getItem("@my_wishes");
        if (savedWishes !== null) {
          setWishList(JSON.parse(savedWishes));
        }
      } catch (e) {
        console.error("데이터 불러오기 실패", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadWishes();
  }, []);

  // 데이터가 변할 때마다 자동 저장
  useEffect(() => {
    const saveWishes = async () => {
      if (isLoaded) {
        try {
          const jsonValue = JSON.stringify(wishList);
          await AsyncStorage.setItem("@my_wishes", jsonValue);
        } catch (e) {
          console.log("데이터 저장 실패", e);
        }
      }
    };
    saveWishes();
  }, [wishList, isLoaded]);

  const addWish = (newWish: WishItem) => {
    setWishList((prev) => [...prev, newWish]);
  };

  const toggleWish = (id: number) => {
    setWishList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  const deleteWish = (id: number) => {
    setWishList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishContext.Provider
      value={{ wishList, setWishList, addWish, toggleWish, deleteWish }}
    >
      {isLoaded ? children : null}
    </WishContext.Provider>
  );
}

export const useWish = () => {
  const context = useContext(WishContext);
  if (!context) throw new Error("useWish must be used within a WishProvider");
  return context;
};
