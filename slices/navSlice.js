import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  Locateonmap: null,
  traveltimeinfo: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setLocateOnMap: (state, action) => {
      state.locate = action.payload;
    },
    setTravelTimeInfo: (state, action) => {
      state.traveltimeinfo = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setLocateOnMap, setTravelTimeInfo } =
  navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectLocateOnMap = (state) => state.nav.locate;
export const selectTravelTimeInfo = (state) => state.nav.traveltimeinfo;

export default navSlice.reducer;
