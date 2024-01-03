import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/user-service";
import { Login } from "../../components/login/login-form-data/login-form-data";

export const onLogin = createAsyncThunk(
  "users/fetchByID",
  async (formLogin: Login) => {
    try {
      const userService = new UserService();
      const response = await userService.login(formLogin);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("tokenId", response.data.user.id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: undefined,
  },
  reducers: {
    logout: (state) => {
      state.data = undefined;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenId");
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(onLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
  },
});
export const { logout } = userSlice.actions;
