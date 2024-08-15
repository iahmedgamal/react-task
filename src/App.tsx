import { useState } from "react";

import "./App.css";
import Header from "./components/Header"
import Sidebar from "./components/Sidebar";
import { User } from "./interfaces/user.interface";
import UserProfile from "./components/UserProfile";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleUserUpdate = (updatedUser: User) => {
    console.log({updatedUser})
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setSelectedUser(updatedUser); 
  };

  return (
    <div className="min-h-screen bg-gray-100-300 flex">
    <Sidebar onUserSelect={handleUserSelect} />
    <main className="flex-1 p-0">
      <Header />
      {selectedUser ? (
          <UserProfile user={selectedUser} onUpdateUser={handleUserUpdate} />
        ) : (
          <p className="text-teal-600 p-6">Select a user to view their profile.</p>
        )}
    </main>
  </div>
  );
}

export default App;
