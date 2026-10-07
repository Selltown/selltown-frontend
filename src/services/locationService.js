const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function searchLocations(query) {
  if (!query.trim()) {
    return [];
  }

  const params = new URLSearchParams({
    text: query,
    filter: "countrycode:gh",
    format: "json",
    limit: "10",
    apiKey: GEOAPIFY_API_KEY,
  });

  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to search locations");
  }

  const data = await response.json();
  return data.results;
}