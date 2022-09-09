import { ILocation } from "../helpers/addLocationToStorage";

export const mockOneLocation: ILocation = {
  id: "locationId:1234837923",
  name: "Test Location Name",
  street: "Test Street",
  postcode: "1123",
  country: "US",
  city: "NY",
  searchIconType: "catering",
};

export const mockLocationsData: ILocation[] = [
  {
    city: "Syracuse",
    country: "United States",
    lat: 43.051511899999994,
    lon: -76.11270660806113,
    name: "Yang Di Chun BBQ",
    id: "locationId:51f1bdab9f360753c0594c3b0ce896864540f00102f901aaf75f090000000092031059616e67204469204368756e20424251",
    postcode: "13224",
    street: "Erie Boulevard East",
    searchIconType: "catering",
  },
  {
    city: "Syracuse",
    country: "United States",
    lat: 43.0471634,
    lon: -76.14820080000001,
    name: "The Mission",
    id: "locationId:51f84ea0be7b0953c059f3639dab09864540f00102f9016f32d6090000000092030b546865204d697373696f6e",
    postcode: "13202",
    street: "East Onondaga Street",
    searchIconType: "catering",
  },
  {
    city: "Syracuse",
    country: "United States",
    lat: 43.04111279999999,
    lon: -76.11949210672896,
    name: "Alto Cinco",
    id: "locationId:511daf04c3a50753c0597477f42643854540f00102f9012f31d7090000000092030a416c746f2043696e636f",
    postcode: "13210",
    searchIconType: "catering",
    street: "Westcott Street",
  },
];
