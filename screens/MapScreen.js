import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-react-native-classnames";
import Maps from "../components/Maps";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionCard from "../components/RideOptionCard";
import { Icon } from "@rneui/base";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { selectLocateOnMap } from "../slices/navSlice";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  // const maplocation = useSelector(selectLocateOnMap);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    };
    getLocation();
  }, []);

  // useEffect(() => {
  //   if (maplocation) {
  //     centerOnUserLocation();
  //   }
  // }, [maplocation]);

  const fitMarkers = () => {
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const centerOnUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    // setLocation(location.coords);
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Maps mapRef={mapRef} fitMarkers={fitMarkers} />
        <TouchableOpacity style={styles.button} onPress={centerOnUserLocation}>
          <Icon
            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
            name="my-location"
            color={"white"}
            type="MaterialIcons"
          />
        </TouchableOpacity>
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptionCard"
            component={RideOptionCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 5,
    left: "90%",
    marginLeft: -25, // To center the button horizontally
    padding: 10,
  },
});
