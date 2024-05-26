import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const EatsScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "#fcbe4c",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{
          width: 400,
          height: 400,
          resizeMode: "contain",
        }}
        source={require("../assets/coming-soon.png")}
      />
    </View>
  );
};

export default EatsScreen;

const styles = StyleSheet.create({});
