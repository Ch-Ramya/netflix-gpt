import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: {
    isSearchActive: false,
    searchResults: null,
    searchText: "",
  },
  reducers: {
    toggleSearchStatus: (state) => {
      state.isSearchActive = !state.isSearchActive;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { toggleSearchStatus, setSearchResults, setSearchText } = gptSlice.actions;

export default gptSlice.reducer;
