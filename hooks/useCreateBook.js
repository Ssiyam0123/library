import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useAuthStore } from "../store/authStore";
import { api } from "../lib/api.js";

export const useCreateBook = () => {
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

      const res = await api.post("/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Success", "Book posted!");
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
    isLoading: mutation.isLoading,
  };
};
