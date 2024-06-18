import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  comfirmdata: null,
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
    setConfirmData: (state, action) => {
      state.comfirmdata = action.payload;
    },
    setTravelTimeInfo: (state, action) => {
      state.traveltimeinfo = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setConfirmData, setTravelTimeInfo } =
  navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectConfirmData = (state) => state.nav.comfirmdata;
export const selectTravelTimeInfo = (state) => state.nav.traveltimeinfo;

export default navSlice.reducer;
