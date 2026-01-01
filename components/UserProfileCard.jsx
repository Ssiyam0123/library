import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

const UserProfileCard = ({ user, onLogout }) => {
  console.log(user);
  return (
    <View className="bg-[#F1FAF1] rounded-2xl p-4 mx-4 mt-4 shadow-sm">
      {/* User Info */}
      <View className="flex-row items-center mb-4">
        <Image source="https://api.dicebear.com/7.x/avataaars/svg?seed=siyam" />

        <View>
          <Text className="text-lg font-semibold text-green-800">
            {user?.username}
          </Text>
          <Text className="text-gray-500 text-sm">{user?.email}</Text>
          <Text className="text-gray-400 text-xs mt-1">
            Member since {user?.createdAt}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={onLogout}
        className="bg-green-500 rounded-xl py-3 flex-row justify-center items-center"
      >
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text className="text-white font-semibold ml-2 text-base">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileCard;
