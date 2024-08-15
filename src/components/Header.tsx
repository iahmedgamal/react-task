
function Header() {
  return (
    <header className="bg-slate-100 text-teal-600 p-4 md:p-6 fixed top-0 inset-x-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">User Profile Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-teal-300">Profile</a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300">Settings</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header