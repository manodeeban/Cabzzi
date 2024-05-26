import { Button, Image, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import NavOption from "../components/NavOption";
import { useDispatch } from "react-redux";
import { setDestination, setLocateOnMap, setOrigin } from "../slices/navSlice";
import SeachFilter from "../components/SeachFilter";
import mockData from "../API/map.json";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import NavFavorite from "../components/NavFavorite";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSelect = (data) => {
    dispatch(setOrigin(data));
    dispatch(setDestination(null));
  };
  const handleClick = async () => {
    navigation.navigate("MapScreen");
    let location = await Location.getCurrentPositionAsync({});
    const data = {
      id: "52",
      latitude: location?.coords?.latitude,
      location: "India, Tamil Nadu, Current Location",
      longitude: location?.coords?.longitude,
    };
    dispatch(setOrigin(data));
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={require("../assets/blackLogo.png")}
        />
        <SeachFilter
          placeholder={"Where From?"}
          mockData={mockData}
          onSelectItem={handleSelect}
        />
        <View style={styles.button}>
          <Button title="Locate On Map" color={"black"} onPress={handleClick} />
        </View>
        <NavOption />
        <NavFavorite />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
  button: {
    marginTop: 10,
  },
});
