import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/base";

const NavFavorite = () => {
  const data = [
    {
      id: "1",
      icon: "home",
      location: "Home",
      destination: "13th Street,Ashok Nagar,Chennai",
    },
    {
      id: "2",
      icon: "business",
      location: "Work",
      destination: "Citipark,Egattur,Chennai",
    },
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={(tw`bg-gray-200 `, { height: 0.5 })} />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-5`}
            name={item.icon}
            type="Ionicons"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500 `}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorite;

const styles = StyleSheet.create({});
