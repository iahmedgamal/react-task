import { Activity } from '../interfaces/activity.interface';

interface MostFrequentActivityProps {
  activities: Activity[];
}

const MostFrequentActivity = ({ activities }: MostFrequentActivityProps) => {

  const getMostFrequentActivity = (activities: Activity[]): string => {
    const activityCount = new Map<string, number>();

    activities.forEach((activity) => {
      const count = activityCount.get(activity.description) || 0;
      activityCount.set(activity.description, count + 1);
    });

    let mostFrequentActivity = '';
    let maxCount = 0;

    for (const [description, count] of activityCount.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentActivity = description;
      }
    }

    return mostFrequentActivity;
  };

  const mostFrequentActivity = getMostFrequentActivity(activities);

  return (
    <div className="p-6 bg-white shadow rounded text-teal-600 mt-6">
      <h2 className="text-2xl font-bold mb-4">Most Frequent Activity</h2>
      <p>{mostFrequentActivity || 'No activities found.'}</p>
    </div>
  );
};

export default MostFrequentActivity;
