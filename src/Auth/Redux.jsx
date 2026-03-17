import { createSlice } from "@reduxjs/toolkit";

const initial = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      ((state.user = user), (state.token = token));
      state.isAuthenticated = !!token;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", user);
    },
    logout: (state) => {
      ((state.user = null),
        (state.token = null),
        (state.isAuthenticated = false));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },

    hydrateAuth: (state) => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user "));

      if (token && user) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setCredentials, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
