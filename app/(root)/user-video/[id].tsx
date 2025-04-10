import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import { useAppwrite } from "@/lib/useAppwrite";
import { getVidoesByUserId } from "@/lib/appwrite";
import { FeaturedCard } from "@/components/Cards";
import NoResults from "@/components/NoResults";

const UserVideo = () => {
  const params = useLocalSearchParams<{ id?: string }>();

  const { data, loading } = useAppwrite({
    fn: getVidoesByUserId,
    params: {
      id: params.id!,
    },
  });

  const handleCardPress = (id: string) => router.push(`/watch/${id}`);
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="my-4 px-4 flex flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={icons.backArrow}
            className="size-9"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="font-rubik-medium text-lg">Videos</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <FeaturedCard onPress={() => handleCardPress(item.$id)} item={item} />
        )}
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size={"large"}
              className="text-primary-300 mt-5"
            />
          ) : (
            <NoResults text="No posts yet" />
          )
        }
      />
    </SafeAreaView>
  );
};

export default UserVideo;
