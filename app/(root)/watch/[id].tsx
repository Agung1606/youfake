import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppwrite } from "@/lib/useAppwrite";
import { getVideoById } from "@/lib/appwrite";
import { VideoView, useVideoPlayer } from "expo-video";
import { useGlobalContext } from "@/context/global-provider";
import icons from "@/constants/icons";

const Watch = () => {
  const { user } = useGlobalContext();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data } = useAppwrite({
    fn: getVideoById,
    params: {
      id: id!,
    },
  });

  const player = useVideoPlayer(data?.video, (player) => {
    player.play();
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <TouchableOpacity className="mb-4 px-4" onPress={() => router.back()}>
        <Text className="text-xl font-rubik-medium text-primary-300">Back</Text>
      </TouchableOpacity>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View className="flex flex-row justify-between px-4 mt-5">
        <View>
          <Text className="font-rubik-semibold text-xl">{data?.title}</Text>
          <View className="flex flex-row gap-x-3 items-center mt-2">
            <Image
              source={{ uri: data?.user.avatar }}
              className="size-10 rounded-full"
              resizeMode="cover"
            />
            <Text className="font-rubik text-lg">{data?.user.username}</Text>
          </View>
        </View>
        {user?.$id === data?.user.$id && (
          <TouchableOpacity>
            <Image
              source={icons.threeDots}
              className="size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Watch;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 275,
    backgroundColor: "black",
  },
});
