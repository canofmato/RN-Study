import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const screenHeight = Dimensions.get("window").height;

type Comment = {
  id: number;
  username: string;
  text: string;
};

type Props = {
  visible: boolean;
  comments: Comment[];
  onAddComment: (text: string) => void;
  onClose: () => void;
};

export default function CommentsInput({
  visible,
  comments,
  onAddComment,
  onClose,
}: Props) {
  const [inputText, setInputText] = useState("");
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  // 모달 열릴 때 슬라이드 업, 닫힐 때 슬라이드 다운
  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSubmit = () => {
    if (inputText.trim() === "") return;
    onAddComment(inputText.trim());
    setInputText("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* 배경 딤처리 - 누르면 닫힘 */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }} />
      </TouchableWithoutFeedback>

      {/* 모달 바텀시트 */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: screenHeight * 0.6,
          backgroundColor: "white",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* 핸들바 */}
        <View
          style={{ alignItems: "center", paddingTop: 12, paddingBottom: 8 }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#dbdbdb",
            }}
          />
        </View>

        {/* 타이틀 */}
        <View
          style={{
            alignItems: "center",
            paddingBottom: 12,
            borderBottomWidth: 0.5,
            borderBottomColor: "#dbdbdb",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>댓글</Text>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* 댓글 목록 */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}
          >
            {comments.length === 0 ? (
              <Text
                style={{
                  textAlign: "center",
                  color: "#8e8e8e",
                  fontSize: 14,
                  marginTop: 40,
                }}
              >
                첫 번째 댓글을 남겨보세요 💬
              </Text>
            ) : (
              comments.map((comment) => (
                <View
                  key={comment.id}
                  style={{
                    flexDirection: "row",
                    marginBottom: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: "#dbdbdb",
                      marginRight: 10,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {comment.username}{" "}
                      </Text>
                      {comment.text}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          {/* 댓글 입력창 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderTopWidth: 0.5,
              borderTopColor: "#dbdbdb",
            }}
          >
            <Image
              source={require("../assets/profile.jpg")}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                marginRight: 10,
              }}
            />
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="댓글 달기..."
              placeholderTextColor="#8e8e8e"
              style={{ flex: 1, fontSize: 14, color: "#000" }}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            {inputText.trim().length > 0 && (
              <TouchableOpacity onPress={handleSubmit}>
                <Text
                  style={{
                    color: "#0095f6",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  게시
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}
