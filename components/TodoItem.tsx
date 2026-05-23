import { useRef } from "react";
import {
    Alert,
    Animated,
    PanResponder,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, styles } from "./week3Styles";

const SWIPE_THRESHOLD = -45; // 이 거리 이상 밀면 삭제 버튼 고정
const DELETE_BUTTON_WIDTH = 56;

type Props = {
  item: { id: string; text: string; done: boolean };
  fadeAnim: Animated.Value;
  onToggle: () => void;
  onRemove: () => void;
};

export function TodoItem({ item, fadeAnim, onToggle, onRemove }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;
  const deleteOpacity = useRef(new Animated.Value(0)).current;
  const isOpen = useRef(false);

  const handleDelete = () => {
    if (!item.done) {
      Alert.alert(
        "아직 완료하지 않았어요🤔",
        `'${item.text}'를 정말 삭제하시겠습니까?`,
        [
          { text: "아니오", style: "cancel" },
          { text: "예", onPress: onRemove },
        ],
      );
    } else {
      onRemove();
    }
  };

  const closeSwipe = () => {
    isOpen.current = false;
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
      Animated.timing(deleteOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const openSwipe = () => {
    isOpen.current = true;
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: -DELETE_BUTTON_WIDTH,
        useNativeDriver: true,
        bounciness: 4,
      }),
      Animated.timing(deleteOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      // 터치 시작 시점엔 절대 낚아채지 않음
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        // 수평 스크롤과 수직 스크롤 관련
        return Math.abs(dx) > Math.abs(dy) * 2 && Math.abs(dx) > 10;
      },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderMove: (_, gestureState) => {
        const baseX = isOpen.current ? -DELETE_BUTTON_WIDTH : 0;
        const newX = baseX + gestureState.dx;
        // 왼쪽으로만, 최대 버튼 너비까지
        const clampedX = Math.min(0, Math.max(-DELETE_BUTTON_WIDTH, newX));
        translateX.setValue(clampedX);
        // 드래그 비율에 따라 버튼 opacity
        deleteOpacity.setValue(Math.abs(clampedX) / DELETE_BUTTON_WIDTH);
      },
      onPanResponderRelease: (_, gestureState) => {
        const baseX = isOpen.current ? -DELETE_BUTTON_WIDTH : 0;
        const totalDx = baseX + gestureState.dx;
        if (totalDx < SWIPE_THRESHOLD) {
          openSwipe();
        } else {
          closeSwipe();
        }
      },
    }),
  ).current;

  return (
    // fade-in 래퍼
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.swipeContainer}>
        <Animated.View
          style={[styles.deleteAction, { opacity: deleteOpacity }]}
        >
          <TouchableOpacity
            style={styles.deleteActionButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteActionText}>삭제</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.listItem, { transform: [{ translateX }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity
            onPress={() => {
              closeSwipe();
              onToggle();
            }}
            style={[
              styles.checkButton,
              {
                borderWidth: item.done ? 0 : 1.5,
                backgroundColor: item.done ? colors.blueMid : "transparent",
              },
            ]}
          >
            {item.done && <Text style={styles.checkText}>✓</Text>}
          </TouchableOpacity>

          <Text
            style={[
              styles.itemText,
              {
                color: item.done ? colors.blueLight : colors.navy,
                textDecorationLine: item.done ? "line-through" : "none",
              },
            ]}
            onPress={closeSwipe}
          >
            {item.text}
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
