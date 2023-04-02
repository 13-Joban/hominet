import React from "react";
import CourseCard from "../CourseCard";

function Courses() {
  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      courseId: "noc23-cs08",
      courseName: "Data Analytics with Python",
      institute: "IITR",
      session: 'January-June',
      academicYear: '2023',
      duration: "12 Weeks",
      courseLink: "https://nptel.ac.in/courses/106107220",
    },
    {
      id: 2,
      title: 'Introduction to Computer Science',
      courseId: 'noc23-cs08',
      courseName: 'Data Analytics with Python',
      institute: 'IITR',
      session: 'January-June',
      academicYear: '2023',
      duration: '12 Weeks',
      courseLink: 'https://nptel.ac.in/courses/106107220'
    },
    {
      id: 3,
      title: 'Introduction to Computer Science',
      courseId: 'noc23-cs08',
      courseName: 'Data Analytics with Python',
      institute: 'IITR',
      duration: '12 Weeks',
      courseLink: 'https://nptel.ac.in/courses/106107220'
    },
    {
      id: 4,
      title: 'Introduction to Computer Science',
      courseId: 'noc23-cs08',
      courseName: 'Data Analytics with Python',
      institute: 'IITR',
      duration: '12 Weeks',
      courseLink: 'https://nptel.ac.in/courses/106107220'
    },
    {
      id: 5,
      title: 'Introduction to Computer Science',
      courseId: 'noc23-cs08',
      courseName: 'Data Analytics with Python',
      institute: 'IITR',
      duration: '12 Weeks',
      courseLink: 'https://nptel.ac.in/courses/106107220'
    },
    {
      id: 6,
      title: 'Introduction to Computer Science',
      courseId: 'noc23-cs08',
      courseName: 'Data Analytics with Python',
      institute: 'IITR',
      duration: '12 Weeks',
      courseLink: 'https://nptel.ac.in/courses/106107220'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default Courses;
