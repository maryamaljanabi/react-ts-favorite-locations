var requestOptions = {
  method: "GET",
};

export const apiRequests = (category: string, name: string, extent: number[] = []): Promise<Response> => {
  return fetch(
    `https://api.geoapify.com/v2/places?categories=${category}&filter=rect:${extent[0]},${extent[1]},${extent[2]},${extent[3]}&limit=30
    ${name ? `&name=${name}` : ""}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY as string}`,
    requestOptions
  );
};
