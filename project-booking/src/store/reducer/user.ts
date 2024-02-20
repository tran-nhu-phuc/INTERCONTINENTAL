import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/user-service";
import { Login } from "../../components/login/login-form-data/login-form-data";

export const onLogin = createAsyncThunk(
  "users/fetchByIDLogin",
  async (formLogin: Login) => {
    try {
      const userService = new UserService();
      const response = await userService.login(formLogin);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("tokenId", response.data.data.id);
      localStorage.setItem(
        "nameUser",
        response.data.data.firstName + " " + response.data.data.lastName
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const onRegister = createAsyncThunk(
  "users/fetchByIDRegister",
  async (formRegister: Login) => {
    try {
      const userService = new UserService();
      const response = await userService.register(formRegister);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("tokenId", response.data.data.id);
      localStorage.setItem(
        "nameUser",
        response.data.data.firstName + " " + response.data.data.lastName
      );
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
      localStorage.removeItem("nameUser");
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
    builder.addCase(onRegister.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(onRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
  },
});
export const { logout } = userSlice.actions;
