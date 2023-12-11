import React from "react";
import Link from "next/link";

export default function SubjectCard({ subject, isEnrolled, imageSrc }) {
  return (
    <div className="shadow-md rounded-md overflow-hidden hover:cursor-pointer hover:shadow-lg transition duration-200 h-full">
      <Link href={isEnrolled ? `/minor/enrolled/subjects/${subject.subjectCode}` : `/minor/enroll/subjects/${subject.subjectCode}`} passHref legacyBehavior>
        <a>
          <img
            className="h-40 w-full object-cover"
            src={isEnrolled ?  imageSrc : imageSrc.src }
            alt={subject.subjectName}
          />
           <div className="p-2 h-30 overflow-hidden">
            <h2 className="text-md font-normal mb-1 leading-6">
              {subject.subjectName}
            </h2>
            <p className="text-gray-600 mb-0">UG</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
