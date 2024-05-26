// import { StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import MapView, { MapPolyline, Marker, Polyline } from "react-native-maps";
// import tw from "tailwind-react-native-classnames";
// import { useSelector } from "react-redux";
// import { selectDestination, selectOrigin } from "../slices/navSlice";
// import MapViewDirections from "react-native-maps-directions";
// import { fetchRoute } from "../API/DirectionAPI";

// const Maps = () => {
//   const origin = useSelector(selectOrigin);
//   const destination = useSelector(selectDestination);
//   console.log(origin, "nffn");
//   const [routeCoordinates, setRouteCoordinates] = useState([]);

//   useEffect(() => {
//     // Example payload
//     const payload = [
//       [80.270186, 13.0836939],
//       [80.2545491, 13.0338602],
//     ];

//     // Fetch route data
//     fetchRoute(payload)
//       .then((data) => {
//         setRouteCoordinates(data?.paths[0]?.points?.coordinates);
//         // Handle route data here, e.g., draw on map
//       })
//       .catch((error) => {
//         // Handle error
//       });
//   }, []);

//   console.log(routeCoordinates, "hfjfnj");
//   const convertedCoordinates = routeCoordinates?.flatMap((coordinate) => {
//     if (coordinate.length >= 2) {
//       const [lat, lng] = coordinate;
//       // Filter out invalid coordinates
//       if (!isNaN(lat) && !isNaN(lng)) {
//         return [{ latitude: lat, longitude: lng }];
//       } else {
//         // Handle invalid coordinate data
//         console.warn("Invalid coordinate:", coordinate);
//         return []; // Exclude invalid coordinate
//       }
//     } else {
//       // Handle missing or incomplete coordinate data
//       console.warn("Incomplete coordinate:", coordinate);
//       return []; // Exclude incomplete coordinate
//     }
//   });

//   // const filteredCoordinates = convertedCoordinates?.filter(
//   //   (coord) => coord !== null
//   // );
//   console.log(convertedCoordinates, "jfhhfuh");

//   const coordinates = [
//     { latitude: 80.270186, longitude: 13.0836939 },
//     { latitude: 80.2545491, longitude: 13.0338602 },
//     // { latitude: 37.7948605, longitude: -122.4596065 },
//     // { latitude: 37.8025259, longitude: -122.4351431 },
//   ];

//   return (
//     <MapView
//       //   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//       style={tw`flex-1`}
//       region={{
//         latitude: origin?.latitude,
//         longitude: origin?.longitude,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       }}
//     >
//       <Polyline
//         coordinates={[
//           { latitude: 80.270186, longitude: 13.0836939 },
//           { latitude: 80.2545491, longitude: 13.0338602 },
//         ]}
//         strokeWidth={4}
//         strokeColor="blue"
//       />

//       {/* <Polyline
//         coordinates={convertedCoordinates}
//         strokeWidth={5}
//         strokeColor="#00f"
//       /> */}

//       {/* {origin && destination && <MapViewDirections />} */}
//       {origin?.location && (
//         <Marker
//           coordinate={{
//             latitude: origin?.latitude,
//             longitude: origin?.longitude,
//           }}
//           title="Origin"
//           identifier="origin"
//         />
//       )}
//     </MapView>
//   );
// };

// export default Maps;

// const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
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
import { fetchAddress, fetchRoute } from "../API/DirectionAPI";
import { Image } from "react-native";
import { Icon } from "@rneui/base";
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
          console.log(travelDetails);
          dispatch(setTravelTimeInfo(travelDetails));
          // Handle route data here, e.g., draw on map
        })
        .catch((error) => {
          // Handle error
        });
    }
    // Example payload
  }, [origin, destination]);

  const convertedCoordinates = convertCoordinates(routeCoordinates);
  // const convertedCoordinates = routeCoordinates?.flatMap((coordinate) => {
  //   if (coordinate.length >= 2) {
  //     const [lat, lng] = coordinate;
  //     // Filter out invalid coordinates
  //     if (!isNaN(lat) && !isNaN(lng)) {
  //       return [{ latitude: lng, longitude: lat }];
  //     } else {
  //       // Handle invalid coordinate data
  //       console.warn("Invalid coordinate:", coordinate);
  //       return []; // Exclude invalid coordinate
  //     }
  //   } else {
  //     // Handle missing or incomplete coordinate data
  //     console.warn("Incomplete coordinate:", coordinate);
  //     return []; // Exclude incomplete coordinate
  //   }
  // });

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
          coordinates={convertedCoordinates}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
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
          // image={}
          // style={styles.image}
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
