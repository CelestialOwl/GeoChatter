/**
 * Calculate distance between two coordinates using the Haversine formula.
 * @returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;

  const radLat1 = degToRad(lat1);
  const radLon1 = degToRad(lon1);
  const radLat2 = degToRad(lat2);
  const radLon2 = degToRad(lon2);

  const earthRadius = 6371; // km

  const dlat = radLat2 - radLat1;
  const dlon = radLon2 - radLon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}
