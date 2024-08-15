import { Activity } from "../interfaces/activity.interface";

interface ActivityProps {
    activities: Activity[];
  }

  
const ActivityList = ({ activities }: ActivityProps) => {
    return (
        <div className="p-6 bg-white  dark:bg-black shadow rounded text-teal-600 mt-6">
          <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
          <ul>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <li key={activity.id} className="mb-2">
                  <p className="font-semibold">{activity.date}</p>
                  <p>{activity.description}</p>
                </li>
              ))
            ) : (
              <p>No activities found.</p>
            )}
          </ul>
        </div>
      );
}
 
export default ActivityList