import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/global-provider";
import { signOut } from "@/lib/appwrite";
import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import { router } from "expo-router";

interface SettingItemProps {
  icon: string;
  title: string;
  onPress?: () => void;
  textStyles?: string;
  showArrow?: boolean;
}

const SettingItem = ({
  icon,
  title,
  onPress,
  textStyles,
  showArrow = true,
}: SettingItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text
        className={`text-lg font-rubik-medium text-black-300 ${textStyles}`}
      >
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const handleLogout = async () => {
    const result = await signOut();
    if (result) {
      setUser(null);
      setIsLoggedIn(false);
      Alert.alert("Success", "Logged out successfully");
      router.replace("/(auth)/sign-in");
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const handleMyVideos = () => router.push("/my-videos");
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView showsVerticalScrollIndicator={false} className="pb-32 px-7">
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-lg font-rubik-semibold">Profile</Text>
          <Image source={icons.bell} className="size-5" resizeMode="contain" />
        </View>
        <View className="flex justify-center items-center mt-10">
          <View className="relative">
            <Image
              source={{ uri: user?.avatar }}
              className="size-40 rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute bottom-0 right-2">
              <Image
                source={icons.edit}
                className="size-9"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text className="font-rubik-bold text-2xl mt-2">
            {user?.username}
          </Text>
        </View>

        <View className="pt-5 mt-5">
          <SettingItem
            title="My Videos"
            icon={icons.videoCamera}
            onPress={handleMyVideos}
          />
        </View>

        <View className="pt-5 mt-5 border-t border-primary-200">
          {settings.map((item, index) => (
            <SettingItem key={index} {...item} />
          ))}
        </View>

        <View className="pt-5 mt-5 border-t border-primary-200">
          <SettingItem
            title="Logout"
            icon={icons.logout}
            textStyles="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
