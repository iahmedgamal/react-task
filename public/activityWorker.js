
self.onmessage = (event) => {
    const { activities } = event.data;
  
    const activityCount = new Map();
  
    activities.forEach(activity => {
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
    console.log("worker", mostFrequentActivity)
    self.postMessage(mostFrequentActivity);
  };