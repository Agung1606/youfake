import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/global-provider";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { FeaturedCard } from "@/components/Cards";
import NoResults from "@/components/NoResults";
import { useAppwrite } from "@/lib/useAppwrite";
import { getVideos } from "@/lib/appwrite";
import { router } from "expo-router";

const Index = () => {
  const { user } = useGlobalContext();
  const { data, loading } = useAppwrite({ fn: getVideos });

  const handleCardPress = (id: string) => router.push(`/watch/${id}`);
  return (
    <SafeAreaView className="bg-white h-full">
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
        ListHeaderComponent={
          <View className="flex flex-row justify-between items-center px-4 py-2 mb-4 border-b border-primary-200">
            <View className="flex flex-row items-center gap-x-2">
              <Image
                source={images.icon}
                className="size-12"
                resizeMode="contain"
              />
              <Text className="text-xl font-rubik">
                Hello,{" "}
                <Text className="text-primary-300">{user?.username}</Text>
              </Text>
            </View>
            <TouchableOpacity>
              <Image
                source={icons.search}
                className="size-7"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size={"large"}
              className="text-primary-300 mt-5"
            />
          ) : (
            <NoResults text="No Result" />
          )
        }
      />
    </SafeAreaView>
  );
};

export default Index;
