import { RootState } from "../store";
import { User } from "../../interfaces/user.interface";

export const selectUsers = (state: RootState): User[] => state.user.users;

export const selectSelectedUser = (state: RootState): User | null =>
  state.user.selectedUser;

export const selectLoading = (state: RootState): boolean => state.user.loading;

export const selectError = (state: RootState): string | null =>
  state.user.error;
