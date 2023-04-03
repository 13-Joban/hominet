import React from 'react';
import SubjectCard from '../SubjectCard';
import getAllSubjects from '../../utils/getAllSubjects';
import getEnrolledSubjects from '../../utils/getEnrolledSubjects';

function EnrolledSubjects() {
  const enrolledSubjects = getEnrolledSubjects();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {enrolledSubjects.map(subject => (
        <SubjectCard key={subject.id} subject={subject} isEnrolled={true} />
      ))}
    </div>
  );
}

export default EnrolledSubjects;