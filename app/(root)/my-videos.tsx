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
import { useGlobalContext } from "@/context/global-provider";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getVidoesByUserId } from "@/lib/appwrite";
import { FeaturedCard } from "@/components/Cards";
import NoResults from "@/components/NoResults";

const MyVideos = () => {
  const { user, loading } = useGlobalContext();

  const { data } = useAppwrite({
    fn: getVidoesByUserId,
    params: {
      id: user?.$id,
    },
  });

  const handleCardPress = (id: string) => router.push(`/watch/${id}`);
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="my-4 px-4 flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => router.navigate("/(root)/(tabs)/profile")}
        >
          <Image
            source={icons.backArrow}
            className="size-9"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="font-rubik-medium text-lg">My Videos</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <FeaturedCard
            onPress={() => handleCardPress(item.$id)}
            userID={user?.$id}
            item={item}
          />
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

export default MyVideos;
