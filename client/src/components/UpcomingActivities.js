import React from 'react';

const UpcomingActivityItem = ({ title, deadline }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-md mb-4 shadow">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">Deadline: {deadline}</p>
      </div>
      {/* You can add any icons or additional information here */}
    </div>
  );
};

const UpcomingActivities = () => {
  // Mock data for demonstration, replace it with actual data from your API or state
  const upcomingActivities = [
    { title: 'Certificate Upload Deadline', deadline: '2023-12-15' },
    { title: 'Result Upload Deadline', deadline: '2023-12-20' },
    // Add more items as needed
  ];

  return (
    <div>
      <h2 className="text-xl text-red font-normal mb-4 sm:text-2xl">Upcoming Activities</h2>
      <hr style={{ border: '1px solid black' }} />

      {upcomingActivities.map((activity, index) => (
        <UpcomingActivityItem key={index} title={activity.title} deadline={activity.deadline} />
      ))}

      {/* Add more UpcomingActivityItem components for additional activities */}
    </div>
  );
};

export default UpcomingActivities;
