import { createSlice } from "@reduxjs/toolkit";

const initialLanguage = localStorage.getItem("app_language") || "en";

const configSlice = createSlice({
  name: "config",
  initialState: {
    language: initialLanguage,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("app_language", action.payload);
    },
  },
});

export const { changeLanguage } = configSlice.actions;

export default configSlice.reducer;
