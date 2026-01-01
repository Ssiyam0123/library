import { Stack } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css"
const queryClient = new QueryClient();

export default function RootLayout() {
  const isLogin = useAuthStore((s) => s.isLogin);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          {isLogin ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="(auth)" />
          )}
        </Stack>
      </QueryClientProvider>
    // </SafeAreaView>
  );
}
