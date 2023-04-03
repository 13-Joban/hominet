import React from 'react';
import SubjectCard from '../SubjectCard';
import getAllSubjects from '../../utils/getAllSubjects'


function Subjects() {
  const subjects = getAllSubjects();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {subjects.map(subject => (
        <SubjectCard key={subject.id} subject={subject} isEnrolled={false} />
      ))}
    </div>
  );
}

export default Subjects;
