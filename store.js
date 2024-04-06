import { reactive } from "vue";

export const store = reactive({
  apartments: [],
  FilteredApartments: [],
  services: [],
  userSearch: "",
  firstApi: null,
  poilist: [],
  jsonPoilist: null,
  apartmentName: [],
});
