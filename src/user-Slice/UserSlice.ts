import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const UsersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      return state;
    },
  },
});

export const { addUser } = UsersSlice.actions;
export const selectUsers = (state: RootState) => state?.users;

export default UsersSlice.reducer;
