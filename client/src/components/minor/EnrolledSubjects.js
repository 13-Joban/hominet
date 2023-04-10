import React from 'react';
import SubjectCard from '../SubjectCard';
import getAllSubjects from '../../utils/getAllSubjects';
import getEnrolledSubjects from '../../utils/getEnrolledSubjects';
import getCourseImage from "../../utils/getCourseImage"
import { useSelector } from 'react-redux';

function EnrolledSubjects() {
  const enrolledSubjects = useSelector(state => state.subjects.enrolledSubjects);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 space-x-1 gap-4 md:gap-8">
      {enrolledSubjects.map(subject => (
        <SubjectCard key={subject.id} subject={subject} isEnrolled={true} imageSrc={getCourseImage(subject.id).src} />
      ))}
    </div>
  );
}

export default EnrolledSubjects;