import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setOrigin,
  setTravelTimeInfo,
} from "../slices/navSlice";
import { fetchRoute } from "../API/DirectionAPI";
import { Image } from "react-native";
import { convertCoordinates, convertMillisecondsToTime } from "../utils/Utils";

const Maps = ({ mapRef, fitMarkers }) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const handleDrag = (e) => {
    const data = {
      id: "51",
      latitude: e.nativeEvent.coordinate.latitude,
      location: "India, Tamil Nadu, Chennai, Pin Location",
      longitude: e.nativeEvent.coordinate.longitude,
    };
    dispatch(setOrigin(data));
  };

  // const getAddress = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${origin?.latitude}&lon=${origin?.longitude}`
  //     );
  //     const data = await response.json();
  //     console.log(data.display_name);
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  useEffect(() => {
    // getAddress();
    if (origin && destination) {
      const payload = [
        [origin?.longitude, origin?.latitude],
        [destination?.longitude, destination?.latitude],
      ];
      // Fetch route data
      fetchRoute(payload)
        .then((data) => {
          setRouteCoordinates(data?.paths[0]?.points?.coordinates);
          fitMarkers();
          const distance = data?.paths[0]?.distance;
          const time = data?.paths[0]?.time;
          const fdistance = (distance / 1000).toFixed(2);
          const ftime = convertMillisecondsToTime(time);
          const travelDetails = {
            distance: fdistance,
            time: ftime,
          };
          dispatch(setTravelTimeInfo(travelDetails));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [origin, destination]);

  return (
    <MapView
      style={tw`flex-1`}
      ref={mapRef}
      region={{
        latitude: origin?.latitude,
        longitude: origin?.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      showsUserLocation={true}
      showsMyLocationButton={false}
    >
      {origin && destination && (
        <Polyline
          coordinates={convertCoordinates(routeCoordinates)}
          strokeColor="#000"
          strokeColors={[
            "#7F0000",
            "#00000000",
            "#B24112",
            "#E5845C",
            "#238C23",
            "#7F0000",
          ]}
          strokeWidth={6}
        />
      )}
      {origin?.location && (
        <Marker
          key={"origin"}
          coordinate={{
            latitude: origin?.latitude,
            longitude: origin?.longitude,
          }}
          onDragEnd={handleDrag}
          draggable
          title="Pick UP"
          identifier="origin"
        >
          <Image
            source={require("../assets/pickup.png")}
            style={styles.image}
          />
        </Marker>
      )}
      {destination?.location && (
        <Marker
          key={"destination"}
          coordinate={{
            latitude: destination?.latitude,
            longitude: destination?.longitude,
          }}
          title="Drop"
          identifier="destination"
          pinColor="green"
        >
          <Image source={require("../assets/drop.png")} style={styles.image} />
        </Marker>
      )}
    </MapView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  image: {
    width: 33,
    height: 33,
    resizeMode: "contain",
  },
});
