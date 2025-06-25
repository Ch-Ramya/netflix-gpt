import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => ({
      ...action.payload,
      favourites: [],
    }),
    removeUser: (state, action) => {
      return null;
    },
    setFavourites: (state, action) => {
      if (state) state.favourites = action.payload;
    },
    addToFavourites: (state, action) => {
      if (state) {
        const exists = state.favourites.find(
          (item) => item.id === action.payload.id
        );
        if (!exists) state.favourites.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      if (state) {
        state.favourites = state.favourites.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const {
  addUser,
  removeUser,
  setFavourites,
  addToFavourites,
  removeFromFavourites,
} = userSlice.actions;

export default userSlice.reducer;
