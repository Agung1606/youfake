import { useState } from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";

export default function Category({ categories }: any) {
  const [activeItem, setActiveItem] = useState(categories[0]._id);
  return (
    <FlatList
      className="my-4"
      data={categories}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={`${
            activeItem === item._id ? "bg-black" : "bg-slate-200"
          } py-2 px-4 mr-4 rounded-lg`}
          activeOpacity={0.7}
          onPress={() => setActiveItem(item._id)}
        >
          <Text
            className={`${
              activeItem === item._id ? "text-white" : ""
            } font-medium`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
