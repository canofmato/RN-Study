import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface WishlistItem {
  id: string;
  title: string;
  note: string;
  checked: boolean;
}

interface WishlistContextValue {
  items: WishlistItem[];
  addItem: (title: string) => WishlistItem | null;
  deleteItem: (id: string) => void;
  toggleCheck: (id: string) => void;
  updateItemNote: (id: string, note: string) => void;
}

const initialItems: WishlistItem[] = [
  {
    id: '1',
    title: '유럽 가기',
    note: '대학교 졸업하기 전에 가고 싶다.\n기간은 한달 정도?\n돈은 음 적어도 700만원 정도면 되려나',
    checked: false,
  },
  {
    id: '2',
    title: '대학 졸업하기',
    note: '그래도 학점 복구 좀 하고 졸업하고 싶다.\n졸프도 좀 잘하고 싶긴함.',
    checked: false,
  },
  {
    id: '3',
    title: '번지점프 해보기',
    note: '예전에 살던 동네에 있는 율동공원에서 해보고 싶다. 없어졌다는 이야기도 들었던거 같은데 ㅠㅠㅠㅠ',
    checked: false,
  },
];

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(initialItems);

  const addItem = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return null;
    }

    const newWishItem: WishlistItem = {
      id: Date.now().toString(),
      title: trimmedTitle,
      note: '',
      checked: false,
    };

    setItems((currentItems) => [newWishItem, ...currentItems]);
    return newWishItem;
  };

  const deleteItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const toggleCheck = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const updateItemNote = (id: string, note: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const value = useMemo(
    () => ({
      items,
      addItem,
      deleteItem,
      toggleCheck,
      updateItemNote,
    }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}
