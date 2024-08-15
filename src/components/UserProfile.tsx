import { User } from '../interfaces/user.interface';

interface UserProfileProps {
    user: User;
  }
const UserProfile = ({ user }:UserProfileProps) => {
    return (
        <div className="p-6 bg-white shadow rounded text-teal-600">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
          <p className="mb-2"><strong>Address:</strong> {user.address}</p>
        </div>
      );
}

export default UserProfile