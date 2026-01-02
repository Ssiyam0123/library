import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useAuthStore } from "../../store/authStore.js";
import { useLogin } from "../../hooks/useLogin.js";
import { useRegister } from "../../hooks/useRegister.js";

const AuthIndex = () => {
  const [loginPage, setLoginPage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const login = useAuthStore((s) => s.login);
  const { mutate } = useLogin();
  const { mutate: registerMutate, isPending: isRegistering } = useRegister();

  // console.log(process.env.EXPO_PUBLIC_API_URL)

  const handleLogin = () => {
    if (!email || !password) return;

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          // console.log("daata from fn : ", data);
          login({ user: data?.user, token: data?.token });
          router.replace("/(tabs)");
        },
        onError: (error) => {
          // console.log(error.response?.data?.message || "Login failed");
          Alert.alert("error willie logging in", error.response?.data?.message || "Login failed");
        },
      }
    );
  };

  const handleSignUp = () => {
    if (!name || !email || !password) return;
    
    registerMutate(
      { username: name, email, password },
      {
        onSuccess: (data) => {
          login({ user: data?.user, token: data?.token });
          router.replace("/(tabs)");
        },
        onError: (error) => {
          console.log(error.response?.data?.message || "Registration failed");
          Alert.alert("error willie registering", error.response?.data?.message || "Registration failed");
        },
      }
    );
  };

  return (

    <View className="flex-1 bg-[#EEF8EE] items-center justify-center px-6 h-screen">
      {/* Illustration */}
      {loginPage && (
        <Image
          source={require("../../assets/images/Bookshop-bro.png")}
          contentFit="contain"
          style={{ width: 224, height: 224 }}
        />
      )}

      {/* Card */}
      <View className="w-full bg-white rounded-2xl p-6 shadow-lg">
        {!loginPage && (
          <View>
            <Text className="text-2xl font-bold text-center mb-6 text-green-700">
              BookWorm
            </Text>
            <Text className="text-center mb-6 text-gray-600">
              Share your favourite reads
            </Text>
          </View>
        )}
        {/* Name */}
        {!loginPage && (
          <View>
            <Text className="text-gray-600 mb-1">Name</Text>
            <View className="flex-row items-center bg-[#F4FBF4] rounded-xl px-4 h-12 mb-4 border border-green-200">
              <Ionicons name="person-outline" size={20} color="#4CAF50" />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                className="flex-1 ml-3 text-gray-700"
                keyboardType="email-address"
              />
            </View>
          </View>
        )}
        {/* Email */}
        <Text className="text-gray-600 mb-1">Email</Text>
        <View className="flex-row items-center bg-[#F4FBF4] rounded-xl px-4 h-12 mb-4 border border-green-200">
          <Ionicons name="mail-outline" size={20} color="#4CAF50" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            className="flex-1 ml-3 text-gray-700"
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <Text className="text-gray-600 mb-1">Password</Text>
        <View className="flex-row items-center bg-[#F4FBF4] rounded-xl px-4 h-12 mb-6 border border-green-200">
          <Ionicons name="lock-closed-outline" size={20} color="#4CAF50" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            className="flex-1 ml-3 text-gray-700"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#4CAF50"
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        {loginPage ? (
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-green-500 rounded-xl h-12 items-center justify-center"
          >
            <Text className="text-white text-lg font-semibold">Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-green-500 rounded-xl h-12 items-center justify-center"
          >
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>
        )}

        {/* Footer */}
        {loginPage ? (
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => setLoginPage(false)}>
              <Text className="text-green-600 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => setLoginPage(true)}>
              <Text className="text-green-600 font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default AuthIndex;
