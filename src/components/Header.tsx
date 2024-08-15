
function Header() {
  return (
    <header className="bg-slate-100 text-teal-600 p-6 flex justify-between items-center m-0 shadow-sm">
    <h1 className="text-3xl font-bold">User Profile Dashboard</h1>
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
  </header>
  )
}

export default Header