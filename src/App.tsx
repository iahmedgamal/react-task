import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { User } from "./interfaces/user.interface";
import UserProfile from "./components/UserProfile";
import Profile from "./pages/profile";
import Settings from "./pages/settings";



function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleUserUpdate = (updatedUser: User) => {
    console.log({ updatedUser });

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onUserSelect={handleUserSelect} />
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-100 mt-16">
          <Routes>
            <Route
              path="/"
              element={
                selectedUser ? (
                  <UserProfile
                    user={selectedUser}
                    onUpdateUser={handleUserUpdate}
                  />
                ) : (
                  <p className="text-teal-600 text-center mt-8">
                    Select a user to view their profile.
                  </p>
                )
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
