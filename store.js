import { reactive } from "vue";

export const store = reactive({
  apartments: [],
  FilteredApartments: [],
  services: [],
  userSearch: "",
  appartmentLat: [],
  appartmentLon: [],
  firstApi: null,
  poilist: [],
  jsonPoilist: null,
  apartmentName: [],
});
