import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RecommendationCard = ({ book, onDelete }) => {
  const handleDeletePress = () => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book recommendation? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(book?._id),
        },
      ],
      { cancelable: true }
    );
  };

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
          {new Date(book?.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Delete Button with Alert */}
      <TouchableOpacity onPress={handleDeletePress}>
        <Ionicons
          name="trash-outline"
          size={20}
          color="#EF4444"
        />
      </TouchableOpacity>
    </View>
  );
};

export default RecommendationCard;