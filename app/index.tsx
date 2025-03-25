import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/global-provider";

const Index = () => {
  const { loading, isLoggedIn } = useGlobalContext();
  if (!loading && isLoggedIn) return <Redirect href={"/(root)/(tabs)"} />;
  
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 flex justify-center items-center px-10">
        <Text className="text-2xl font-rubik-bold">
          Welcome to <Text className="text-primary-300">YouFake</Text>
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-in")}
          className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-12"
        >
          <View className="flex flex-row justify-center items-center gap-x-2">
            {/* put email image below this comment */}
            <Text className="text-lg text-black-300 font-rubik-medium">
              Continue with Email
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
