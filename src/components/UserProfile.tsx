import { useEffect, useState } from "react";
import { User } from "../interfaces/user.interface";

interface UserProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}
const UserProfile = ({ user, onUpdateUser }: UserProfileProps) => {
  const [formData, setFormData] = useState<User>(user);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof User, string>> = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onUpdateUser(formData);
    }
  };

  return (
    <form
      className="p-6 bg-white shadow rounded text-teal-600"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border border-teal-300 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border border-teal-300 rounded w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          className="p-2 border border-teal-300 rounded w-full"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          className="p-2 border border-teal-300 rounded w-full"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UserProfile;
