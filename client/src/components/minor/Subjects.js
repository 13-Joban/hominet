import React, { useEffect } from 'react';
import SubjectCard from '../SubjectCard';
import getCourseImage from '../../utils/getCourseImage';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSubjects, fetchEnrolledSubjects } from '../../api';

export default function Subjects() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.allSubjects);
  const enrolledSubjects = useSelector((state) => state.subjects.enrolledSubjects);
  let unenrolledSubjects= subjects;

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEnrolledSubjects());
  }, [dispatch]);

  if (!subjects) {
    return <p>Loading...</p>;
  }

  if(enrolledSubjects){
    unenrolledSubjects = subjects.filter(
      (subject) =>  !enrolledSubjects.some((ensub) => ensub.subjectCode === subject.subjectCode)
    );
  }

   


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 space-x-1 gap-4 md:gap-8">
      {unenrolledSubjects.map((subject, index) => (
        <SubjectCard
          key={subject.subjectCode}
          subject={subject}
          isEnrolled={false}
          imageSrc={getCourseImage(index)}
        />
      ))}
    </div>
  );
}
