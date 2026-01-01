import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../../store/authStore.js";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const mutation = useMutation({
    mutationFn: async (bookData) => {
      if (!token) throw new Error("User not logged in");

      const formData = new FormData();
      formData.append("title", bookData.title);
      formData.append("caption", bookData.caption);
      formData.append("rating", bookData.rating.toString());
      formData.append("image", {
        uri: bookData.image,
        type: "image/jpeg",
        name: "book.jpg",
      });

      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/books`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Success", "Book posted successfully!");
      setTitle("");
      setCaption("");
      setImage(null);
      setRating(0);
      queryClient.invalidateQueries(["books"]);
    },
    onError: (error) => {
      Alert.alert("Error", error.response?.data?.message || error.message);
    },
  });

  const handleSubmit = () => {
    if (!title || !caption || !rating || !image) {
      return Alert.alert("Error", "Please fill all fields");
    }
    mutation.mutate({ title, caption, rating, image });
  };

  return (
    <ScrollView className="flex-1 bg-[#EEF8EE] p-6">
      <Text className="text-2xl font-bold text-green-700 mb-2">
        Add Book Recommendation
      </Text>
      <Text className="text-gray-600 mb-4">
        Share your favorite reads with others
      </Text>

      {/* Book Title */}
      <Text className="text-gray-600 mb-1">Book Title</Text>
      <View className="bg-white rounded-xl border border-green-200 px-4 h-12 mb-4 justify-center">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter book title"
          className="text-gray-700"
        />
      </View>

      {/* Rating */}
      <Text className="text-gray-600 mb-1">Your Rating</Text>
      <View className="flex-row mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={32}
              color="#FBBF24"
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Book Image */}
      <Text className="text-gray-600 mb-1">Book Image</Text>
      <TouchableOpacity
        onPress={pickImage}
        className="bg-white border border-green-200 rounded-xl h-40 mb-4 items-center justify-center"
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full h-full rounded-xl"
            style={{ resizeMode: "contain" }}
          />
        ) : (
          <View className="items-center">
            <Ionicons name="image-outline" size={48} color="#4CAF50" />
            <Text className="text-gray-500 mt-2">Tap to select image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Caption */}
      <Text className="text-gray-600 mb-1">Caption</Text>
      <View className="bg-white rounded-xl border border-green-200 px-4 py-2 mb-6">
        <TextInput
          value={caption}
          onChangeText={setCaption}
          placeholder="Write your review or thoughts about this book..."
          multiline
          numberOfLines={4}
          className="text-gray-700"
          textAlignVertical="top"
          style={{ minHeight: 100 }}
        />
      </View>

      {/* Post Button with Loader */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={mutation?.isLoading}
        className={`rounded-xl h-12 items-center justify-center ${
          mutation?.isLoading ? "bg-black" : "bg-green-500"
        }`}
        
      >
        {mutation?.isLoading ? (
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="white" style={{ marginRight: 8 }} />
            <Text className="text-white text-lg font-semibold">Posting...</Text>
          </View>
        ) : (
          <Text className="text-white text-lg font-semibold">
            Post Recommendation
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}