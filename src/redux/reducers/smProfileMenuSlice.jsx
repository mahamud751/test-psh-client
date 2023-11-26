import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileMenu: false,
};
const profileMenuSlice = createSlice({
  name: "profileMenu",
  initialState,

  reducers: {
    placeProfileMenu: (state, action) => {
      state.isProfileMenu = action.payload;
    },
  },
});

export const { placeProfileMenu } = profileMenuSlice.actions;
export default profileMenuSlice.reducer;
