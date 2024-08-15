import { useEffect, useState } from 'react';
import { Activity } from '../interfaces/activity.interface';

interface MostFrequentActivityProps {
  activities: Activity[];
}

const MostFrequentActivity = ({ activities }: MostFrequentActivityProps) => {
  const [mostFrequentActivity, setMostFrequentActivity] = useState<string | null>(null);

  useEffect(() => {
    if (activities.length === 0) {
      setMostFrequentActivity('No activities found.');
      return;
    }

    const worker = new Worker(new URL('/workers/activityWorker.js', import.meta.url));

    worker.onmessage = (event) => {
      setMostFrequentActivity(event.data || 'No activities found.');
    };

    worker.postMessage({ activities });

    return () => {
      worker.terminate();
    };
  }, [activities]);

  return (
    <div className="p-6 bg-white  dark:bg-black shadow rounded text-teal-600 mt-6">
      <h2 className="text-2xl font-bold mb-4">Most Frequent Activity</h2>
      <p>{mostFrequentActivity}</p>
    </div>
  );
};

export default MostFrequentActivity;
