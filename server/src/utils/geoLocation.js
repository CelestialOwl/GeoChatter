export function calculateDistance(lat1, lon1, lat2, lon2) {
  console.log(lat1, lon1, lat2, lon2);
  // Convert latitude and longitude from degrees to radians
  const degToRad = (degrees) => (degrees * Math.PI) / 180;
  lat1 = degToRad(lat1);
  lon1 = degToRad(lon1);
  lat2 = degToRad(lat2);
  lon2 = degToRad(lon2);

  // Radius of the Earth in kilometers (mean value)
  const earthRadius = 6371;

  // Haversine formula
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = earthRadius * c;

  console.log("user distance", distance);

  return distance;
}

const distance = calculateDistance(
  31.4508233,
  74.2647738,
  31.4478656,
  74.3924207
); // Berlin to Paris
console.log(`Distance: ${distance} kilometers`);
