import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/home"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">Navbar Content</div>
        </nav>

        <div className="flex-grow bg-gray-100 p-4">
          <div className="container mx-auto">
            <Home/>
          </div>
        </div>

        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">Footer Content</div>
        </footer>
      </div>
    </>
  );
}

export default App;
