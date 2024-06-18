import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Image } from "@rneui/themed/dist/Image";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectTravelTimeInfo, setConfirmData } from "../slices/navSlice";
import { calculateFare } from "../utils/Utils";
import LottieView from "lottie-react-native";

const RideOptionCard = () => {
  const dispatch = useDispatch();
  const BASE_FARE = 60; // Base fare in INR
  const FARE_UPTO_20KM = 12; // Fare per km for the first 20 km in INR
  const FARE_AFTER_20KM = 18; // Fare per km after 20 km in INR
  const Navigation = useNavigation();
  const traveldetail = useSelector(selectTravelTimeInfo);
  const totalFare = calculateFare(
    traveldetail?.distance,
    BASE_FARE,
    FARE_UPTO_20KM,
    FARE_AFTER_20KM
  );

  const [selected, setSelected] = useState(null);

  console.log(selected, "dihif");
  const data = [
    {
      id: 1,
      title: "Cab X",
      multiplier: 1,
      image: require("../assets/RideCard1.png"),
    },
    {
      id: 2,
      title: "Cab XL",
      multiplier: 1.2,
      image: require("../assets/RideCard2.png"),
    },
    {
      id: 3,
      title: "Cab LUX",
      multiplier: 1.5,
      image: require("../assets/RideCard3.png"),
    },
  ];
  useEffect(() => {
    if (selected) {
      dispatch(setConfirmData(selected));
    }
  }, [selected]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          onPress={() => Navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {traveldetail?.distance}km
        </Text>
      </View>
      <View style={tw`h-4/5`}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const fare = totalFare * item.multiplier;
            const formattedFare = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(fare);
            return (
              <TouchableOpacity
                onPress={() => setSelected({ ...item, fare: formattedFare })}
                style={tw`flex-row justify-between items-center px-10 ${
                  item.id === selected?.id && "bg-gray-200"
                }`}
              >
                <Image
                  style={{ width: 100, height: 100, resizeMode: "contain" }}
                  source={item.image}
                />
                <View style={tw`-ml-6`}>
                  <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                  <Text>{traveldetail?.time.formatted} Travel time</Text>
                </View>
                <Text style={tw`text-xl`}>{formattedFare}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <View>
          <TouchableOpacity
            onPress={() => Navigation.navigate("ConfirmBooking")}
            disabled={!selected}
            style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
          >
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionCard;

const styles = StyleSheet.create({});
