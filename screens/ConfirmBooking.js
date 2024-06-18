import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import tw from "tailwind-react-native-classnames";
import { format } from "date-fns/format";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectConfirmData, setConfirmData } from "../slices/navSlice";

const ConfirmBooking = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const confirmData = useSelector(selectConfirmData);
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  console.log(confirmData, "fdata");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);
  const formattedDate = format(currentDateTime, "EEEE, MMMM d, yyyy");
  const formattedTime = format(currentDateTime, "hh:mm a");
  const onDone = () => {
    Navigation.navigate("MapScreen");
    dispatch(setConfirmData({ ...confirmData, done: true }));
  };
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animation1.json")}
        autoPlay
        //loop={false}
        style={styles.animation}
      />
      <LottieView
        source={require("../assets/animation2.json")}
        autoPlay
        loop={false}
        resizeMode="cover"
        style={styles.animation1}
      />

      <Text style={tw`text-sm p-2`}>Hi, mano</Text>
      <Text style={tw`text-center text-2xl p-2`}>
        Your Ride Has Been Confirmed
      </Text>
      <View style={tw`justify-center bg-gray-200 p-5 rounded-2xl h-36`}>
        <Text style={tw`text-base`}>
          Your ride with Driver Mr.sankar on {formattedDate} at {formattedTime}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onDone}>
        <Text style={tw`text-white text-center`}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  animation: {
    width: 400,
    height: 300,
  },
  animation1: {
    // height: 800,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    zIndex: 1,
    // pointerEvents:"none",
  },
  button: {
    backgroundColor: "black",
    position: "relative",
    zIndex: 1,
    marginTop: 150,
    padding: 20,
    width: 350,
    borderRadius: 20,
  },
});

export default ConfirmBooking;
