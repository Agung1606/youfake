import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppwrite } from "@/lib/useAppwrite";
import { getUserByUserId } from "@/lib/appwrite";
import icons from "@/constants/icons";
import SettingItem from "@/components/SettingItem";

const VisitProfile = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data: user, loading: userLoading } = useAppwrite({
    fn: getUserByUserId,
    params: {
      id: id!,
    },
  });

  const handlePress = () => router.push(`/user-video/${user.$id}`);
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-7">
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.backArrow}
              className="size-8"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image source={icons.bell} className="size-7" resizeMode="contain" />
        </View>
        <View className="flex justify-center items-center mt-10">
          <Image
            source={{ uri: user?.avatar }}
            className="size-32 rounded-full"
            resizeMode="cover"
          />
          <Text className="font-rubik-bold text-xl mt-2">{user?.username}</Text>
        </View>
        <View className="pt-5 mt-5">
          <SettingItem
            title={`Videos`}
            icon={icons.videoCamera}
            onPress={handlePress}
          />
        </View>
        <View className="pt-5 mt-5 border-t border-primary-200">
          <SettingItem
            title={`Report`}
            icon={icons.warning}
            textStyles="text-danger"
            showArrow={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VisitProfile;
