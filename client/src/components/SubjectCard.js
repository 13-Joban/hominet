import React from "react";
import Link from "next/link";

export default function SubjectCard({ subject, isEnrolled }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:cursor-pointer hover:shadow-lg transition duration-200">
      <Link href={isEnrolled ? `/minor/enrolled/subjects/${subject.subjectCode}` : `/minor/enroll/subjects/${subject.subjectCode}`} passHref legacyBehavior>
        <a>
          <img
            className="h-40 w-full object-cover"
            src="https://via.placeholder.com/300x200.png?text=Subject+Image"
            alt={subject.subjectName}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{subject.subjectName}</h2>
            <p className="text-gray-600">{subject.description}</p>
            <p className="text-gray-600">{subject.session}
            <span className="p-1">
                {subject.academicYear}
            </span>
            </p>
            {isEnrolled && <p className="text-gray-600">Enrolled</p>}
          </div>
        </a>
      </Link>
    </div>
  );
}
