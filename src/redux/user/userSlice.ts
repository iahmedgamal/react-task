import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";
import { fetchUsers } from "./userThunks";

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const userIndex = state.users.findIndex(user => user.id === updatedUser.id);
      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser;
        state.selectedUser = updatedUser;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { selectUser, updateUser  } = userSlice.actions;
export default userSlice.reducer;
