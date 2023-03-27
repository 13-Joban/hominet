import React from "react";

function Card({ course }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <img className="h-40 w-full object-cover" src='https://via.placeholder.com/300x200.png?text=Course+Image' alt={course.title} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{course.title}</h2>
        <p className="text-gray-600">{course.description}</p>
      </div>
    </div>
  );
}

export default Card;
