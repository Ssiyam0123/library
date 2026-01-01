import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RecommendationCard = ({ book, onDelete }) => {
  return (
    <View className="bg-[#F1FAF1] rounded-2xl p-3 mx-4 mb-3 flex-row items-center shadow-sm">
      
      {/* Book Image */}
      <Image
        source={{ uri: book?.image }}
        className="w-16 h-20 rounded-lg mr-3"
        resizeMode="cover"
      />

      {/* Content */}
      <View className="flex-1">
        <Text className="text-green-800 font-semibold text-base">
          {book?.title}
        </Text>

        {/* Rating */}
        <View className="flex-row my-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= book?.rating ? "star" : "star-outline"}
              size={14}
              color="#FACC15"
            />
          ))}
        </View>

        <Text
          className="text-gray-600 text-sm"
          numberOfLines={2}
        >
          {book?.caption}
        </Text>

        <Text className="text-xs text-gray-400 mt-1">
          {book?.createdAt}
        </Text>
      </View>

      {/* Delete */}
      <TouchableOpacity onPress={() => onDelete(book?._id)}>
        <Ionicons
          name="trash-outline"
          size={20}
          color="#6B7280"
        />
      </TouchableOpacity>
    </View>
  );
};

export default RecommendationCard;
