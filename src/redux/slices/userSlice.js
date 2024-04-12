import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserList = createAsyncThunk(
  'user/fetchUserList',
  async (_, { getState }) => {
    try {

      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found"); // Throw an error if user object is not found
      }

      const user = JSON.parse(userString); // Parse the user object
      const token = user.token; // Access the token property

      const response = await axios.get('http://localhost:8000/api/user/getUsers', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      
      // Filter out the logged-in user from the response
      const loggedUserId = getState().auth.userId;
      const filteredUsers = response.data.filter(user => user._id !== loggedUserId);

      return filteredUsers;
    } catch (error) {
      throw error;
    }
  }
);

const Slice = createSlice({
  name: 'user',
  initialState: {
    userList: [],
    loading: false,
    error: null,
    selectedUserId: null,
  },
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
        state.error = null; // Reset error if successful
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message if request fails
      });
  },
});

export const { setSelectedUserId } = Slice.actions;
export const selectSelectedUserId = (state) => state.user.selectedUserId;
export const selectUserList = (state) => state.user.userList;
export const selectUserListLoading = (state) => state.user.loading;
export const selectUserListError = (state) => state.user.error;

export default Slice.reducer;
