import { reactive } from "vue";

export const store = reactive({
  apartments: [],
  FilteredApartments: [],
  sponsoredFilteredApartments:[],
  unSponsoredFilteredApartments:[],
  services: [],
  userSearch: "",
  firstApi: null,
  isChecked: false,
  sponsoredApartments: [],
  notSponsoredApartments:[],
  text:true
});
