/**
 * Reverse-geocodes a latitude/longitude pair into a human-readable address
 * using OpenStreetMap's free Nominatim API. Used by ComplaintLocationPicker
 * so citizens don't have to type their address manually after dropping a
 * pin. Requires the browser to have internet access to nominatim — no API
 * key needed, but respect Nominatim's usage policy in production (add a
 * proper User-Agent / rate-limit if this ships beyond a demo).
 */
const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      { headers: { Accept: "application/json" } },
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data?.display_name ?? null;
  } catch {
    return null;
  }
};

/**
 * Haversine distance between two coordinates, in kilometers.
 */
const distanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const mapUtils = {
  reverseGeocode,
  distanceInKm,
};

export default mapUtils;
