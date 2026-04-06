import React, { createContext, useContext, useState } from "react";

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
      {children}
    </WishContext.Provider>
  );
}

export const useWish = () => {
  const context = useContext(WishContext);
  if (!context) throw new Error("useWish must be used within a WishProvider");
  return context;
};
