import { useState } from "react";


const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];
  
  interface User {
    id: number;
    name: string;
  }

  

interface SidebarProps {
    onUserSelect: (user: User) => void;
  }



const SideBar = ({ onUserSelect }: SidebarProps)  => {
const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUserId(user.id);
    onUserSelect(user);
  };

  return (
    <aside className="bg-slate-50 w-64 p-4 text-cyan-500 shadow-sm	 ">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={`p-2 cursor-pointer ${
              selectedUserId === user.id ? 'bg-teal-600 text-white' : ''
            }`}
            onClick={() => handleUserClick(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar