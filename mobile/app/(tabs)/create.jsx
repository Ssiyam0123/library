import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCreateBook } from "../../hooks/useCreateBook.js";

export default function CreatePage() {
  const {
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
  } = useCreateBook();

  return (
    <ScrollView
      className="flex-1 bg-[#E8F6E9] p-2 mx-auto w-full"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 bg-[#EFF8F2] w-[90%] mx-auto mt-4 p-6 rounded-2xl">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-green-700 mb-2">
            Add Book Recommendation
          </Text>
          <Text className="text-gray-600">
            Share your favorite reads with others
          </Text>
        </View>

        {/* Book Title */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Book Title *</Text>
          <View className="bg-white rounded-xl border border-green-200 px-4 h-12 justify-center">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter book title"
              className="text-gray-700 text-base"
              editable={!isPosting}
            />
          </View>
        </View>

        {/* Rating */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Your Rating *</Text>
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => !isPosting && setRating(star)}
                disabled={isPosting}
              >
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={32}
                  color={isPosting ? "#D1D5DB" : "#FBBF24"}
                  style={{ marginRight: 8 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Book Image */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Book Image *</Text>
          <TouchableOpacity
            onPress={pickImage}
            disabled={isPosting}
            className={`bg-white border rounded-xl h-40 mb-4 items-center justify-center ${
              isPosting ? "border-gray-300" : "border-green-200"
            }`}
          >
            {image ? (
              <View className="relative w-full h-full">
                <Image
                  source={{ uri: image }}
                  className="w-full h-full rounded-xl"
                  resizeMode="cover"
                />
                {isPosting && (
                  <View className="absolute inset-0 bg-black/40 rounded-xl items-center justify-center">
                    <ActivityIndicator size="large" color="white" />
                  </View>
                )}
              </View>
            ) : (
              <View className="items-center">
                <Ionicons
                  name="image-outline"
                  size={48}
                  color={isPosting ? "#9CA3AF" : "#4CAF50"}
                />
                <Text
                  className={`mt-2 ${isPosting ? "text-gray-400" : "text-gray-500"}`}
                >
                  {isPosting ? "Uploading..." : "Tap to select image"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Caption */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-1">Caption *</Text>
          <View className="bg-white rounded-xl border border-green-200 px-4 py-3">
            <TextInput
              value={caption}
              onChangeText={setCaption}
              placeholder="Write your review, thoughts, or why you recommend this book..."
              multiline
              className="text-gray-700 text-base"
              textAlignVertical="top"
              style={{ minHeight: 120 }}
              editable={!isPosting}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isPosting || !title || !caption || !image || rating === 0}
          className={`rounded-xl h-14 items-center justify-center mb-6 ${
            isPosting || !title || !caption || !image || rating === 0
              ? "bg-gray-400"
              : "bg-green-500 active:bg-green-600"
          }`}
        >
          {isPosting ? (
            <View className="flex-row items-center">
              <ActivityIndicator size="small" color="white" />
              <Text className="text-white text-lg font-semibold ml-3">
                Posting...
              </Text>
            </View>
          ) : (
            <Text className="text-white text-lg font-semibold">
              Post Recommendation
            </Text>
          )}
        </TouchableOpacity>

        {/* Progress indicator */}
        {isPosting && (
          <View className="items-center mb-4">
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text className="text-gray-600 mt-2">
              Sharing your recommendation...
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              This may take a moment
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}