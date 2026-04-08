import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import CloseIcon from "../assets/images/X.svg";
import Card from "./Card";

interface WishListProps {
  visible: boolean;
  onClose: () => void;
  items: any[];
  onToggleItem: (id: number) => void;
}

export default function WishList({
  visible,
  onClose,
  items,
  onToggleItem,
}: WishListProps) {
  const [scrollOffset, setScrollOffset] = useState(0); // 현재 스크롤 위치
  const [contentHeight, setContentHeight] = useState(1); // 전체 리스트의 실제 높이
  const containerHeight = 380; // 우리가 고정한 리스트 영역 높이
  const scrollBarHeight = 100; // 움직이는 막대(핸들)의 높이

  // 스크롤바 핸들의 위치 계산
  // (현재 스크롤 위치 / 전체 스크롤 가능 범위) * (스크롤바가 움직일 수 있는 전체 범위)
  const scrollBarTop =
    contentHeight > containerHeight
      ? (scrollOffset / (contentHeight - containerHeight)) *
        (containerHeight - scrollBarHeight)
      : 0;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-wish/50 items-center justify-center">
        <View className="w-[360px] flex-col gap-8 p-5 items-center rounded-[30px] bg-white">
          {/* header */}
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-[20px] font-semibold text-black">
              View WishList
            </Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <CloseIcon width={30} height={30} />
            </Pressable>
          </View>

          {/* list section*/}
          <View className="flex-row w-full h-[380px] gap-2 items-center justify-center">
            {/* list */}
            <View className="flex-1 w-full">
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={15} //스크롤이벤트 감지
                contentContainerStyle={{ gap: 20 }}
                onScroll={(event) => {
                  setScrollOffset(event.nativeEvent.contentOffset.y);
                }}
                onContentSizeChange={(_, height) => {
                  setContentHeight(height);
                }}
              >
                {items.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    emoji={item.emoji}
                    title={item.title}
                    description={item.description}
                    isDone={item.isDone}
                    onToggle={() => onToggleItem(item.id)}
                    onCloseModal={onClose}
                  />
                ))}
              </ScrollView>
            </View>

            {/* scroll bar */}
            <View className="w-[10px] h-full relative overflow-hidden rounded-[10px] border border-wishLight">
              <View
                className="absolute w-full bg-wishLight rounded-[10px]"
                style={{
                  height: scrollBarHeight,
                  top: scrollBarTop,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
