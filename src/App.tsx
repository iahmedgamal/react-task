import { useState } from "react";

import "./App.css";
import Header from "./components/Header"
import Sidebar from "./components/Sidebar";
import { User } from "./interfaces/user.interface";

function App() {



  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-100-300 flex">
    <Sidebar onUserSelect={handleUserSelect} />
    <main className="flex-1 p-0">
      <Header />
      {selectedUser ? (
        <div>
          <h2 className="text-xl font-bold">User Profile</h2>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
          <p>Address: {selectedUser.address}</p>
          {/* Additional user details will go here */}
        </div>
      ) : (
        <p>Select a user to view their profile.</p>
      )}
    </main>
  </div>
  );
}

export default App;
