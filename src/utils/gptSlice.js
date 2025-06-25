import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: {
    isSearchActive: false,
    searchResults: null,
    searchText: "",
    isLoading: false,
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearSearch: (state) => {
      state.searchText = "";
      state.searchResults = null;
      state.isSearchActive = false;
      state.isLoading = false;
    },
  },
});

export const { toggleSearchStatus, setSearchResults, setSearchText, setLoading, clearSearch } = gptSlice.actions;

export default gptSlice.reducer;
