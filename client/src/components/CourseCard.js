import React from "react";
import Link from "next/link";

export default function CourseCard({ course, isEnrolled, imageSrc }) {
  return (
    <div className="relative w-full aspect-w-1 aspect-h-1 md:w-2/3 ">
      <div className="bg-white shadow-md rounded-md overflow-hidden hover:cursor-pointer hover:shadow-lg transition duration-200 h-full">
        <Link
          href={isEnrolled ? `/minor/enrolled/courses/${course.courseId}` : `/minor/enroll/courses/${course.courseId}`}
          passHref
          legacyBehavior
        >
          <a>
            <img
              className="h-40 w-full object-cover"
              src={imageSrc}
              alt={course.title}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
