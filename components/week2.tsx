import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CommentsInput from "./commentsInput";
import "./global.css";

const screenWidth = Dimensions.get("window").width;

type Comment = {
  id: number;
  username: string;
  text: string;
};

export default function App() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: "친구계정", text: "너무 예쁘다 😍" },
  ]);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleAddComment = (text: string) => {
    setComments((prev) => [
      ...prev,
      { id: Date.now(), username: "_soobeenee_", text },
    ]);
  };

  const iconStyle = { width: 24, height: 24 };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ backgroundColor: "white" }}>
            {/* 프로필 영역 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/profile.jpg")}
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                />
                <Text
                  style={{ marginLeft: 10, fontWeight: "bold", fontSize: 14 }}
                >
                  _soobeenee_
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>···</Text>
              </TouchableOpacity>
            </View>

            {/* 게시물 이미지 */}
            <Image
              source={require("../assets/post.jpg")}
              style={{ width: screenWidth, height: screenWidth }}
              resizeMode="cover"
            />

            {/* 액션 버튼 영역 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 14,
                paddingVertical: 12,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* 좋아요 */}
                <TouchableOpacity
                  onPress={handleLikePress}
                  style={{ marginRight: 16 }}
                >
                  <Image
                    source={
                      isLiked
                        ? require("../assets/heart2.png")
                        : require("../assets/heart1.png")
                    }
                    style={iconStyle}
                  />
                </TouchableOpacity>
                {/* 댓글 - 누르면 모달 열림 */}
                <TouchableOpacity
                  style={{ marginRight: 16 }}
                  onPress={() => setIsCommentModalVisible(true)}
                >
                  <Image
                    source={require("../assets/comment.png")}
                    style={iconStyle}
                  />
                </TouchableOpacity>
                {/* 보내기(DM) */}
                <TouchableOpacity>
                  <Image
                    source={require("../assets/send.png")}
                    style={iconStyle}
                  />
                </TouchableOpacity>
              </View>
              {/* 북마크 */}
              <TouchableOpacity>
                <Image
                  source={require("../assets/bookmark.png")}
                  style={iconStyle}
                />
              </TouchableOpacity>
            </View>

            {/* 좋아요 수 */}
            <View style={{ paddingHorizontal: 14 }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                좋아요 {likeCount.toLocaleString()}개
              </Text>
            </View>

            {/* 게시물 설명 */}
            <View
              style={{
                paddingHorizontal: 14,
                paddingTop: 6,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                _soobeenee_{" "}
              </Text>
              <Text style={{ fontSize: 14 }}>오늘도 좋은 하루 🌿</Text>
            </View>

            {/* 댓글 미리보기 - 눌러도 모달 열림 */}
            <TouchableOpacity
              style={{ paddingHorizontal: 14, paddingTop: 6 }}
              onPress={() => setIsCommentModalVisible(true)}
            >
              <Text style={{ color: "#8e8e8e", fontSize: 14, marginBottom: 4 }}>
                댓글 {comments.length}개 모두 보기
              </Text>
              {comments.slice(-1).map((comment) => (
                <View key={comment.id} style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                    {comment.username}{" "}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{comment.text}</Text>
                </View>
              ))}
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* 댓글 모달 */}
        <CommentsInput
          visible={isCommentModalVisible}
          comments={comments}
          onAddComment={handleAddComment}
          onClose={() => setIsCommentModalVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
