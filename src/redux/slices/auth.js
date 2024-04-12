import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";
const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

//reducer
export default slice.reducer;

// Log in// Log in
export function LoginUser(formValues) {
  //form values
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        "api/auth/login",
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      console.log(response.data.token);
      // Lưu token vào local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Dispatch action để cập nhật trạng thái đăng nhập
      dispatch(slice.actions.logIn({
        isLoggedIn: true,
        token: response.data.token,
      }));

      // Hiển thị snack bar với thông báo thành công
      dispatch(showSnackbar({ severity: "success", message: response.data.message }));
    } catch (error) {
      console.log(error);
      // Hiển thị snack bar với thông báo lỗi
      dispatch(showSnackbar({ severity: "error", message: error.message }));
    }
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());
    localStorage.removeItem("user");
  };
}

export function resetPassword(formValues) {
  return async (dispatch, getState) => {
    try {
      // Send a POST request to the backend to reset password
      const response = await axios.post("/auth/resetPassword", formValues);

      // Dispatch action if password reset successfully
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
}

