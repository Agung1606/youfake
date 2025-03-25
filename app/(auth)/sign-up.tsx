import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/global-provider";
import { createUser } from "@/lib/appwrite";
import { Fumi } from "react-native-textinput-effects";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import images from "@/constants/images";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Tolong di isi semua!!!");
      return;
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/(root)/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="w-full h-[30%] flex justify-center items-center">
        <Image source={images.icon} className="size-48" resizeMode="contain" />
      </View>
      <View className="px-4">
        <Fumi
          label="Nama pengguna"
          iconClass={FontAwesome6}
          iconName="user"
          iconColor="#000000"
          iconSize={20}
          inputPadding={16}
          style={{ marginBottom: 10 }}
          value={form.username}
          onChangeText={(e) => setForm({ ...form, username: e })}
        />
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
            {isSubmitting ? "Loading..." : "Buat akun"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-8 w-full px-4">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.6}
          className="border border-primary-300 p-3 rounded-full"
        >
          <Text className="text-center text-lg text-primary-300 font-semibold">
            Sudah punya akun?
          </Text>
        </TouchableOpacity>
        <Text className="text-center mt-4 text-sm font-thin">
          YouFake Corporation
        </Text>
      </View>
    </SafeAreaView>
  );
}
/* <SafeAreaView>
  <View className="px-5 h-full flex justify-center">
    <Fumi
      label="Nama pengguna"
      iconClass={FontAwesome6}
      iconName="user"
      iconColor="#000000"
      iconSize={20}
      inputPadding={16}
      style={{ marginBottom: 10 }}
      value={form.username}
      onChangeText={(e) => setForm({ ...form, username: e })}
    />
    <Fumi
      label="Email"
      iconClass={FontAwesome6}
      iconName="envelope"
      iconColor="#000000"
      iconSize={20}
      inputPadding={16}
      style={{ marginBottom: 10 }}
      value={form.email}
      keyboardType="email-address"
      onChangeText={(e) => setForm({ ...form, email: e })}
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
    />
    <TouchableOpacity
      activeOpacity={0.9}
      className={`bg-blue-600 p-3 rounded-full ${
        isSubmitting ? "opacity-50" : "opacity-100"
      }`}
      onPress={submit}
    >
      <Text className="text-center text-white text-lg font-semibold">
        {isSubmitting ? "Loading..." : "Buat akun"}
      </Text>
    </TouchableOpacity>
  </View>
  <View className="absolute bottom-10 w-full px-5">
    <TouchableOpacity
      onPress={() => router.back()}
      activeOpacity={0.6}
      className="border border-blue-500 p-3 rounded-full"
    >
      <Text className="text-center text-lg text-blue-500 font-semibold">
        Sudah punya akun?
      </Text>
    </TouchableOpacity>
    <Text className="text-center mt-4 text-sm font-thin">
      YouFake Corporation
    </Text>
  </View>
</SafeAreaView> */
