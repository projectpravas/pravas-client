import { createSlice } from "@reduxjs/toolkit";
import TourModel from "../../shared/models/tourModel";
import { RootState } from "../store";

const TourSlice = createSlice({
  name: "tours",
  initialState: [],
  reducers: {
    addAllTours: (state, { payload }) => {
      return payload;
    },
    addOneTour: (state, { payload }) => {
      return payload;
    },
  },
});

export const { addAllTours } = TourSlice.actions;
export const selectAllTours = (state: RootState) => state?.tours as Array<any>;

export default TourSlice.reducer;
