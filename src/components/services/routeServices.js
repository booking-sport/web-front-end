// routeService.js
export const getRoute = async (start, end, key) => {
  const [startLng, startLat] = start;
  const [endLng, endLat] = end;

  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${startLng},${startLat}&end=${endLng},${endLat}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch route");
  }
  const data = await response.json();
  return data.features[0].geometry; // GeoJSON geometry
};
