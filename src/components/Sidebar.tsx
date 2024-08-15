import { useEffect, useState } from "react";
import { User } from "../interfaces/user.interface";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { selectUser } from "../redux/user/userSlice";
import { selectUsers, selectSelectedUser, selectLoading, selectError } from "../redux/user/userSelectors";
import { fetchUsers } from "../redux/user/userThunks";

const SideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    dispatch(selectUser(user));
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const sidebarClasses = `bg-slate-100 dark:bg-black p-6 text-teal-500 fixed top-16 bottom-0 left-0 shadow-lg transition-transform duration-300 ease-in-out ${
    isSidebarOpen ? "translate-x-0 w-1/2" : "-translate-x-[200%] w-0"
  } md:relative md:translate-x-0 md:w-64`;

  const content = loading ? (
    <div className="text-center">Loading users...</div>
  ) : error ? (
    <div className="text-center">Error: {error}</div>
  ) : (
    <>
      <h2 className="text-lg font-bold mb-4 text-center">Users</h2>
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            className={`p-2 cursor-pointer text-center ${
              selectedUser?.id === user.id ? "bg-teal-600 text-white" : ""
            } hover:bg-teal-100 transition-colors`}
            onClick={() => handleUserClick(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 md:hidden p-2 bg-teal-600 text-white rounded-full shadow-md z-10 flex items-center justify-center w-10 h-10"
      >
        {isSidebarOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      <aside className={sidebarClasses}>
        {content}
      </aside>
    </>
  );
};

export default SideBar;
