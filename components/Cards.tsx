import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import { Models } from "react-native-appwrite";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import humanize from "humanize-number";
import icons from "@/constants/icons";
import { router } from "expo-router";

interface Props {
  myId?: string;
  visitProfileId?: string;
  item: Models.Document;
  onPress?: () => void;
}

// Extend dayjs with relativeTime
dayjs.extend(relativeTime);

export const ClickableImage = ({
  id,
  myId,
  avatarUri,
}: {
  id?: string;
  myId?: string;
  avatarUri: string;
}) => {
  const handlePress = () => {
    if (!id && !myId) {
      return;
    }

    if(id === myId) {
      router.push('/(root)/(tabs)/profile');
      return;
    }
    if(id) {
      router.push(`/visit-profile/${id}`)
      return;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{ uri: avatarUri }}
        className="size-10 rounded-full"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export const FeaturedCard = ({
  myId,
  visitProfileId,
  item,
  onPress,
}: Props) => {
  return (
    <View className="mb-8">
      <TouchableOpacity onPress={onPress}>
        <View className="relative">
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-60"
            resizeMode="cover"
          />
          <Image
            source={images.cardGradient}
            className="absolute bottom-0 w-full h-60"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      <View className="flex flex-row justify-between mt-4 px-3">
        <View className="flex flex-row gap-x-4">
          <ClickableImage
            id={visitProfileId}
            myId={myId}
            avatarUri={item.user.avatar}
          />
          <View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="font-rubik text-lg max-w-80"
            >
              {item.title}
            </Text>
            <Text className="mt-1 text-sm font-rubik text-gray-600">
              <Text>{item.user.username}</Text> •{" "}
              <Text>{humanize(item.views)}</Text> x ditonton •{" "}
              <Text>{dayjs(item.$createdAt).fromNow()}</Text>
            </Text>
          </View>
        </View>
        {myId === item.user.$id && (
          <TouchableOpacity>
            <Image
              source={icons.threeDots}
              className="size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
