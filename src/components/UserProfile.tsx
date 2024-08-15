import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../interfaces/user.interface";
import { Activity } from "../interfaces/activity.interface";
import ActivityList from "./Activity";
import MostFrequentActivity from "./MostFrequentActivity";
import { updateUser } from "../redux/user/userSlice";
import { notifyError, notifySuccess } from "../utils/notificationUtil";
import { RootState } from "../redux/store";

const UserProfile = () => {
  const dispatch = useDispatch();

  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const [formData, setFormData] = useState<User | null>(selectedUser);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (selectedUser) {
      const fetchActivities = async () => {
        try {
          const response = await fetch(`/activities/${selectedUser.id}.json`);
          if (!response.ok) {
            throw new Error("Failed to fetch activities");
          }
          const data = await response.json();
          setActivities(data);
        } catch (error) {
          console.error(error);
          setActivities([]);
        }
      };

      fetchActivities();
    }
  }, [selectedUser]);

  useEffect(() => {
    setFormData(selectedUser);
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
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

    if (!formData?.name) {
      newErrors.name = "Name is required";
    }

    if (!formData?.email || !validateEmail(formData?.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData?.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData?.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && formData) {
      dispatch(updateUser(formData));
      notifySuccess("User data updated successfully");
    } else {
      notifyError(newErrors.name || "Validation error");
    }
  };

  if (!selectedUser) {
    return <p className="text-teal-600 text-center mt-8">Select a user to view their profile.</p>;
  }

  return (
    <div>
      <form className="p-6 bg-white  dark:bg-black shadow rounded text-teal-600" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData?.name }
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
            value={formData?.email}
            onChange={handleChange}
            className="p-2 border border-teal-300 rounded w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData?.phone}
            onChange={handleChange}
            className="p-2 border border-teal-300 rounded w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData?.address}
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

      <ActivityList activities={activities} />
      <MostFrequentActivity activities={activities} />
    </div>
  );
};

export default UserProfile;
