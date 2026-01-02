import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useAuthStore } from "../store/authStore";
import { api } from "../lib/api";
import { useRouter } from "expo-router";

export const useCreateBook = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter()

  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
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
      
      if (bookData.image) {
        formData.append("image", {
          uri: bookData.image,
          type: "image/jpeg",
          name: "book.jpg",
        });
      }

      const res = await api.post("/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onMutate: () => {
      setIsPosting(true);
      return { isPosting: true };
    },
    onSuccess: (data) => {
      Alert.alert("Success", "Book posted successfully!");
      
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["userBooks"] });
      
      setTitle("");
      setCaption("");
      setImage(null);
      setRating(0);
      router.replace("/(tabs)/profile");
    },
    onError: (error) => {
      Alert.alert("Error", error.response?.data?.message || "Failed to post");
    },
    onSettled: () => {
      setIsPosting(false);
    },
  });

  const handleSubmit = () => {
    if (!title || !caption || !rating || !image) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    mutation.mutate({ title, caption, rating, image });
  };

  return {
    title,
    setTitle,
    rating,
    setRating,
    image,
    caption,
    setCaption,
    pickImage,
    handleSubmit,
    isPosting,
    isLoading: mutation.isLoading,
  };
};