import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAuthStore } from "../../store/authStore.js";
import UserProfileCard from "../../components/UserProfileCard.jsx";
import RecommendationCard from "../../components/RecommendationCard.jsx";
import { useUserBook } from "../../hooks/useUserBook.jsx";
import { useDeleteBook } from "../../hooks/useDeleteBook.js";

const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  const logOut = useAuthStore((s) => s.logout);

  const { data, isLoading } = useUserBook();
  const {mutate : deleteBook, isPending} = useDeleteBook();

  return (
    <ScrollView className="flex-1 bg-white">
      
      {/* User Card */}
      <UserProfileCard user={user} onLogout={logOut} />

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mt-6 mb-3">
        <Text className="text-lg font-semibold text-green-800">
          Your Recommendations
        </Text>
        <Text className="text-gray-500">
          {data?.length || 0} books
        </Text>
      </View>

      {/* Loading */}
      {isLoading && (
        <Text className="text-center text-gray-400 mt-4">
          Loading...
        </Text>
      )}

      {/* Book List */}
      <View className="pb-6">
        {data?.map((book) => (
          <RecommendationCard
            key={book._id}
            book={book}
            onDelete={deleteBook}
          />
        ))}
      </View>

    </ScrollView>
  );
};

export default ProfilePage;
