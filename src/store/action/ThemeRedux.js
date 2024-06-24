import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: localStorage.getItem("Goozzy_theme") ? localStorage.getItem("Goozzy_theme") === "true" ? true : false : false,
  miniSilder: false
}


const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      localStorage.setItem("Goozzy_theme", action.payload)
      state.darkTheme = action.payload;
    },
    toggleSlider(state, action) {
      state.miniSilder = action.payload;
    },
  },
});

export const { toggleTheme, toggleSlider } = ThemeSlice.actions;
export default ThemeSlice.reducer;
