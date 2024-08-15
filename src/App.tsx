import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UserProfile from "./components/UserProfile";
import Profile from "./pages/profile";
import Settings from "./pages/settings";



function App() {


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar  />
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-100 mt-16">
          <Routes>
            <Route
              path="/"
              element={
                <UserProfile/>
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
