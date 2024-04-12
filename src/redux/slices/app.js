import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

//
// import { dispatch } from "../store";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  users: [],
  friends: [],
  friendRequests: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    //toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.request;
    },
  },
});

//reducer
export default slice.reducer;
//

export function ToggleSidebar() {
  return async (dispatch, state) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async (dispatch, state) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

export function showSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackbar({
        message,
        severity,
      })
    );
    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 4000);
  };
}

export const closeSnackbar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackbar());
};
//users
export const FetchUsers = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("/user/getUsers", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response && response.data && response.data.data) {
        console.log(response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      } else {
        console.log("No data received from the server");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Xử lý lỗi tại đây nếu cần thiết, ví dụ:
      // dispatch(slice.actions.fetchUsersError({ error: error.message }));
    }
  };
};

//friends
export const FetchFriends = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/getFriends", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchFriendRequests = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/getFriendRequests", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateFriendRequests({ request: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
