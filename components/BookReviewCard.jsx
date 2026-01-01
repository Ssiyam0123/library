import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BookReviewCard = ({ book }) => {
  return (
    <View className="bg-[#F1FAF1] rounded-2xl p-4 mb-4 w-[95%] mx-auto">
      
      {/* User */}
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: book.user?.profileImage }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Text className="font-semibold text-gray-800">
          {book.user?.username}
        </Text>
      </View>

      {/* Book Image */}
      <Image
        source={{ uri: book.image }}
        className="w-full h-44 rounded-xl mb-3"
      />

      {/* Title */}
      <Text className="text-lg font-bold text-green-800 mb-1">
        {book.title}
      </Text>

      {/* Rating */}
      <View className="flex-row mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= book.rating ? "star" : "star-outline"}
            size={16}
            color="#FACC15"
          />
        ))}
      </View>

      {/* Caption */}
      <Text className="text-gray-600 text-sm mb-2">
        {book.caption}
      </Text>

      {/* Date */}
      <Text className="text-xs text-gray-400">
        {new Date(book.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default BookReviewCard;
