import { useEffect, useState } from "react";
import { User } from "../interfaces/user.interface";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {  selectUser } from "../redux/user/userSlice";
import { selectUsers, selectSelectedUser, selectLoading, selectError } from "../redux/user/userSelectors";
import { fetchUsers } from "../redux/user/userThunks";

interface SidebarProps {
  onUserSelect: (user: User) => void;
}

const SideBar = ({ onUserSelect }: SidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    dispatch(selectUser(user));
    onUserSelect(user);
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <aside
        className={`bg-slate-100 w-full md:w-64 p-4 text-teal-500 fixed top-16 bottom-0 left-0 shadow-lg md:relative transition-transform duration-300 ${
          isSidebarOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        }`}
      >
        Loading users...
      </aside>
    );
  }

  if (error) {
    return (
      <aside
        className={`bg-slate-100 w-full md:w-64 p-4 text-teal-500 fixed top-16 bottom-0 left-0 shadow-lg md:relative transition-transform duration-300 ${
          isSidebarOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        }`}
      >
        Error: {error}
      </aside>
    );
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-11 left-4 md:hidden p-2 bg-teal-600 text-white rounded-full shadow-md z-10 flex items-center justify-center w-10 h-10"
      >
        {isSidebarOpen ? (
          <HiX className="w-6 h-6" />
        ) : (
          <HiMenu className="w-6 h-6" />
        )}
      </button>

      <aside
        className={`bg-slate-100 md:w-64 p-6 text-teal-500 fixed top-16 bottom-0 left-0 shadow-lg md:relative transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-lg font-bold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-2 cursor-pointer ${
                selectedUser?.id === user.id ? "bg-teal-600 text-white" : ""
              } hover:bg-teal-100 transition-colors`}
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
