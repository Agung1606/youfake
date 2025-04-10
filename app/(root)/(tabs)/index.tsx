import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/global-provider";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { useAppwrite } from "@/lib/useAppwrite";
import { getVideos } from "@/lib/appwrite";
import { FeaturedCard } from "@/components/Cards";
import NoResults from "@/components/NoResults";
import Filters from "@/components/Filters";

const Index = () => {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ filter?: string }>();

  const handleCardPress = (id: string) => router.push(`/watch/${id}`);

  const { data, loading, refetch } = useAppwrite({
    fn: getVideos,
    params: {
      filter: params.filter!,
    },
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
    });
  }, [params.filter]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <FeaturedCard
            onPress={() => handleCardPress(item.$id)}
            myId={user?.$id}
            visitProfileId={item.user.$id}
            item={item}
          />
        )}
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-4 py-2 mb-4">
            <View className="flex flex-row justify-between items-center border-b border-primary-200">
              <View className="flex flex-row items-center gap-x-2">
                <Image
                  source={images.icon}
                  className="size-12"
                  resizeMode="contain"
                />
                <View>
                  <Text className="font-rubik text-sm">Hello,</Text>
                  <Text className="font-rubik-medium">{user?.username}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image
                  source={icons.search}
                  className="size-7"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Filters />
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
