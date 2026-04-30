import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import Emoji from "../assets/images/Emoji.svg";
import CloseIcon from "../assets/images/X.svg";

interface WishModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: { emoji: string; title: string; description: string }) => void;
}

export default function WishModal({ visible, onClose, onAdd }: WishModalProps) {
  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetFields = () => {
    setEmoji("");
    setTitle("");
    setDescription("");
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleAdd = () => {
    if (!emoji || !title) {
      alert("이모지와 소원을 입력해주세요!");
      return;
    }
    onAdd({ emoji, title, description });
    resetFields();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-wish/50 items-center justify-center">
        <View className="w-[360px] flex-col gap-[5px] p-5 rounded-[30px] bg-white">
          {/* header */}
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-[20px] font-semibold text-black">
              Add Wish
            </Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <CloseIcon width={30} height={30} />
            </Pressable>
          </View>

          {/* input*/}
          <View className="w-full flex-col gap-3 items-start">
            <View className="relative items-center">
              {emoji === "" && (
                <View
                  className="absolute z-10 w-10 h-10 rounded-full border border-gray-400 items-center justify-center"
                  pointerEvents="none"
                >
                  <Emoji width={24} height={24} />
                </View>
              )}

              <TextInput
                className="w-10 h-10 rounded-full border border-gray-400 text-center text-heading1"
                value={emoji}
                onChangeText={setEmoji}
                maxLength={2}
                keyboardType="default"
              />
            </View>

            <TextInput
              className="w-full h-10 p-[10px] rounded-[10px] border border-gray-400"
              placeholder="Write your Wish"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              className="w-full h-[90px] p-[10px] rounded-[10px] border border-gray-400"
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              textAlignVertical="top" // 안드로이드 정렬
            />
          </View>

          {/* button */}
          <View className="w-full h-[50px] flex-row items-center justify-between">
            <Pressable
              className="w-[140px] h-[50px] items-center justify-center rounded-[10px] border border-gray-400"
              onPress={handleClose}
            >
              <Text className="text-[20px] font-semibold text-gray-400">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              className="w-[140px] h-[50px] items-center justify-center rounded-[10px] border border-wishLight"
              onPress={handleAdd}
            >
              <Text className="text-[20px] font-semibold text-wishLight">
                Add
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
