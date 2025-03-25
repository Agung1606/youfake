import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signIn, getCurrentUser } from "@/lib/appwrite";
import { Fumi } from "react-native-textinput-effects";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import images from "@/constants/images";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/global-provider";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Tolong di isi semua!!!");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/(root)/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="w-full h-2/5 flex justify-center items-center">
        <Image source={images.icon} className="size-48" resizeMode="contain" />
      </View>
      <View className="px-4">
        <Fumi
          label="Email"
          iconClass={FontAwesome6}
          iconName="envelope"
          iconColor="#000000"
          iconSize={20}
          inputPadding={16}
          style={{ marginBottom: 10 }}
          value={form.email}
          onChangeText={(e) => setForm({ ...form, email: e })}
          autoCorrect={false}
          spellCheck={false}
          keyboardType="email-address"
        />
        <Fumi
          label="Kata sandi"
          iconClass={FontAwesome6}
          iconName="lock"
          iconColor="#000000"
          iconSize={20}
          inputPadding={16}
          style={{ marginBottom: 20 }}
          value={form.password}
          onChangeText={(e) => setForm({ ...form, password: e })}
          autoCorrect={false}
          spellCheck={false}
          secureTextEntry
        />
        <TouchableOpacity
          activeOpacity={0.9}
          className={`bg-primary-300 p-3 rounded-full ${
            isSubmitting ? "opacity-50" : "opacity-100"
          }`}
          onPress={submit}
        >
          <Text className="text-center text-white text-lg font-semibold">
            {isSubmitting ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-8 w-full px-4">
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-up")}
          activeOpacity={0.6}
          className="border border-primary-300 p-3 rounded-full"
        >
          <Text className="text-center text-lg text-primary-300 font-semibold">
            Buat akun baru
          </Text>
        </TouchableOpacity>
        <Text className="text-center mt-4 text-sm font-thin">
          YouFake Corporation
        </Text>
      </View>
    </SafeAreaView>
  );
}
