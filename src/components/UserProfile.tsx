import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { User } from "../interfaces/user.interface";
import { Activity } from "../interfaces/activity.interface";
import ActivityList from "./Activity";
import MostFrequentActivity from "./MostFrequentActivity";
import { updateUser } from "../redux/user/userSlice";
import { notifySuccess } from "../utils/notificationUtil";
import { RootState } from "../redux/store";

const UserProfile = () => {
  const dispatch = useDispatch();

  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );
  const [activities, setActivities] = useState<Activity[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: selectedUser || {},
  });

  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser);

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

  const onSubmit = (data: User) => {
    dispatch(updateUser(data));
    notifySuccess("User data updated successfully");
  };

  if (!selectedUser) {
    return (
      <p className="text-teal-600 text-center mt-8">
        Select a user to view their profile.
      </p>
    );
  }

  return (
    <div>
      <form
        className="p-6 bg-white  dark:bg-black shadow rounded text-teal-600"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="p-2 border border-teal-300 rounded w-full"
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.name.message)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="p-2 border border-teal-300 rounded w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            {...register("phone", { required: "Phone number is required" })}
            className="p-2 border border-teal-300 rounded w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{`${errors.phone}`}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            {...register("address", { required: "Address is required" })}
            className="p-2 border border-teal-300 rounded w-full"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{`${errors.address}`}</p>
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
