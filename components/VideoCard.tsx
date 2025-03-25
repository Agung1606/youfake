import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import humanize from "humanize-number";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with relativeTime
dayjs.extend(relativeTime);

type Props = {
  $id: string | number | null;
  thumbnail: any;
  channelProfilePic: any;
  channelName: string;
  title: string;
  views: number;
  createdAt: string;
};

export default function VideoCard({
  $id,
  thumbnail,
  channelProfilePic,
  channelName,
  title,
  views,
  createdAt,
}: Props) {
  const router = useRouter();

  const navigateToWatchVideo = () => {
    router.push({
      pathname: "/watch-video",
      params: {
        $id,
      },
    });
  };
  return (
    <View>
      <TouchableOpacity
        className="relative"
        activeOpacity={0.9}
        onPress={navigateToWatchVideo}
      >
        <Image
          source={{ uri: thumbnail }}
          alt={channelName}
          className="w-full h-60"
          resizeMode="cover"
        />
        <View className="absolute bottom-2 right-5 bg-black/60 p-[3px] rounded-md">
          <Text className="text-white font-semibold text-[13px]">13.04</Text>
        </View>
      </TouchableOpacity>
      <View className="flex flex-row justify-between px-3 mt-4">
        <View className="flex flex-row gap-x-3">
          <Image
            source={{ uri: channelProfilePic }}
            alt={channelName}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="max-w-80 text-[16px]"
            >
              {title}
            </Text>
            <Text className="mt-1 text-sm text-gray-600">
              <Text>{channelName}</Text> • <Text>{humanize(views)}</Text> x
              ditonton • <Text>{dayjs(createdAt).fromNow()}</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
