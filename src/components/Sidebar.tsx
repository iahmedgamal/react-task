import { useEffect, useState } from "react";
import { User } from "../interfaces/user.interface";


interface SidebarProps {
  onUserSelect: (user: User) => void;
}

const SideBar = ({ onUserSelect }: SidebarProps) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users.json");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUserId(user.id);
    onUserSelect(user);
  };

  if (loading) {
    return (
      <aside className="bg-slate-100 w-64 p-4 text-teal-500">
        Loading users...
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="bg-slate-100 w-64 p-4 text-teal-500">
        Error: {error}
      </aside>
    );
  }

  return (
    <aside className="bg-slate-50 w-64 p-4 text-cyan-500 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={`p-2 cursor-pointer ${
              selectedUserId === user.id ? "bg-teal-600 text-white" : ""
            }`}
            onClick={() => handleUserClick(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
