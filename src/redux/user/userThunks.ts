import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await fetch('/mockedData/users.json');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data as User[];
  });