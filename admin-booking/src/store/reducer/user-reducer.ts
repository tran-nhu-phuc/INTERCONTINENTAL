import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/user-services";
import { Login } from "../../components/login/login";
export const onLogin = createAsyncThunk(
  "admin/fetchByID",
  async (formLogin: Login) => {
    try {
      const userService = new UserService();
      const response = await userService.login(formLogin);
      localStorage.setItem("token_admin", response.data.accessToken);
      localStorage.setItem("tokenId_admin", response.data.data.id);
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
      localStorage.removeItem("token_admin");
      localStorage.removeItem("tokenId_admin");
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
