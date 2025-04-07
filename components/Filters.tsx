import { Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handlePress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4 mb-1"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(item.category)}
          className={`mr-4 py-2 px-4 rounded-md ${
            selectedCategory === item.category
              ? "bg-primary-300"
              : "bg-primary-100 border border-primary-200"
          }`}
        >
          <Text
            className={`${
              selectedCategory === item.category
                ? "text-white font-rubik-bold"
                : "text-black-300 font-rubik"
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
