import React, { useEffect } from 'react';
import SubjectCard from '../SubjectCard';
import getCourseImage from '../../utils/getCourseImage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnrolledSubjects, getAllSubjects } from '../../api';

function EnrolledSubjects() {
  const dispatch = useDispatch();
  const enrolledSubjects = useSelector((state) => state.subjects.enrolledSubjects);
  const allSubjects = useSelector((state) => state.subjects.allSubjects);

  useEffect(() => {
    dispatch(fetchEnrolledSubjects());
    dispatch(getAllSubjects());
  }, [dispatch]);

  // Function to get subject information based on subjectCode
  const getSubjectInfo = (subjectCode) => {
    return allSubjects.find((subject) => subject.subjectCode === subjectCode);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 space-x-1 gap-4 md:gap-8">
      {enrolledSubjects && enrolledSubjects.map((enrolledSubject) => {
        // Get additional information from allSubjects based on subjectCode
        const subjectInfo = getSubjectInfo(enrolledSubject.subjectCode);

        return (
          <SubjectCard
            key={enrolledSubject.id}
            subject={{
              ...enrolledSubject,
              // Add additional information from allSubjects
              subjectName: subjectInfo ? subjectInfo.subjectName : '',
              credits: subjectInfo ? subjectInfo.credits : '',
              // Add other properties you need
            }}
            isEnrolled={true}
            imageSrc={getCourseImage(enrolledSubject.id).src}
          />
        );
      })}
    </div>
  );
}

export default EnrolledSubjects;
