export function calculateFare(distance, baseFare, fareUpto20km, fareAfter20km) {
  let fare = baseFare;

  if (distance <= 20) {
    fare += distance * fareUpto20km;
  } else {
    fare += 20 * fareUpto20km;
    fare += (distance - 20) * fareAfter20km;
  }

  return fare;
}

export function convertMillisecondsToTime(ms) {
  // Calculate hours, minutes and seconds
  let hours = Math.floor(ms / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);

  // Construct the time string
  let timeString = "";
  if (hours > 0) {
    timeString += `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    if (timeString.length > 0) {
      timeString += ", ";
    }
    timeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
  // if (seconds > 0) {
  //   if (timeString.length > 0) {
  //     timeString += ", ";
  //   }
  //   timeString += `${seconds} second${seconds > 1 ? "s" : ""}`;
  // }

  return {
    formatted: timeString,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

export function convertCoordinates(routeCoordinates) {
  return routeCoordinates?.flatMap((coordinate) => {
    if (coordinate.length >= 2) {
      const [lat, lng] = coordinate;
      // Filter out invalid coordinates
      if (!isNaN(lat) && !isNaN(lng)) {
        return [{ latitude: lng, longitude: lat }];
      } else {
        // Handle invalid coordinate data
        console.warn("Invalid coordinate:", coordinate);
        return []; // Exclude invalid coordinate
      }
    } else {
      // Handle missing or incomplete coordinate data
      console.warn("Incomplete coordinate:", coordinate);
      return []; // Exclude incomplete coordinate
    }
  });
}
