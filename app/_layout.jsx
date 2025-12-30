import "../global.css";
import { Stack, Redirect, useSegments } from "expo-router";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const segments = useSegments();
  const isLogin = useAuthStore((s) => s.isLogin);

  const isAuthGroup = segments[0] === "(auth)";

  if (!isLogin && !isAuthGroup) {
    return <Redirect href="/(auth)" />;
  }

  if (isLogin && isAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
