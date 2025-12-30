import { Link } from "expo-router";
import "../global.css";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-700 text-xl font-bold">
        NativeWind Installed 🎉
      </Text>
      <Text className="text-pink-800">HII</Text>
      <Link href="/(auth)/index.jsx" className="mt-4 text-blue-500 underline">
        Go to Login
      </Link>
    </View>
  );
}
