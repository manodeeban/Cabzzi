import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import mockData from "../API/map.json";
import SeachFilter from "./SeachFilter";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setDestination } from "../slices/navSlice";
import NavFavorite from "./NavFavorite";
import { Icon } from "@rneui/base";

const NavigateCard = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);

  const handleSelect = (data) => {
    dispatch(setDestination(data));
  };
  return (
    <SafeAreaView style={tw`bg-white flex-1 p-5`}>
      <Text style={tw`text-center py-5 text-xl`}>Destination</Text>
      <View style={tw`flex-shrink`}>
        <View>
          <SeachFilter
            placeholder={"To Where?"}
            mockData={mockData}
            onSelectItem={handleSelect}
          />
        </View>
        <NavFavorite />
      </View>
      <View style={Styles.container}>
        <TouchableOpacity
          disabled={!destination}
          onPress={() => Navigation.navigate("RideOptionCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full ${
            !destination && "opacity-20"
          }`}
        >
          <Icon name="car" type="antdesign" color={"white"} size={16} />
          <Text style={tw`text-white text-center`}>Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="fastfood" type="ionicons" color={"black"} size={16} />
          <Text style={tw`text-center`}>Eat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    zIndex: -1,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: "auto",
    position: "relative",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
});
