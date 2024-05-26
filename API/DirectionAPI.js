// graphHopperAPI.js

const apiUrl = "https://graphhopper.com/api/1/route";
const apiKey = "b16b1d60-3c8c-4cd6-bae6-07493f23e589";

const fetchRoute = async (payload) => {
  const inputPayload = {
    points: payload,
    snap_preventions: ["motorway", "ferry", "tunnel"],
    details: ["road_class", "surface","time"],
    // "alternative_route.max_paths": 3,
    // algorithm: "alternative_route",
    profile: "car",
    locale: "en",
    instructions: true,
    calc_points: true,
    points_encoded: false,
  };
  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputPayload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching route:", error);
    throw error;
  }
};

export { fetchRoute };

// const fetchAddress = async (latitude, longitude) => {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching Address:", error);
//     throw error;
//   }
// };

// export { fetchAddress };
