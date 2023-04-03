import React from "react";
import Link from "next/link";

function CourseCard({ course, isEnrolled }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:cursor-pointer hover:shadow-lg transition duration-200">
      <Link href={isEnrolled  ? `/minor/enrolled/courses/${course.courseId}`  : `/minor/enroll/courses/${course.courseId}`}  passHref legacyBehavior>
        <a>
          <img
            className="h-40 w-full object-cover"
            src="https://via.placeholder.com/300x200.png?text=Course+Image"
            alt={course.title}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default CourseCard;
