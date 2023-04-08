import React from 'react';
import SubjectCard from '../SubjectCard';
import getAllSubjects from '../../utils/getAllSubjects'
import getCourseImage from "../../utils/getCourseImage"

export default function Subjects() {
  const subjects = getAllSubjects();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 space-x-1 gap-4 md:gap-8">
      {subjects.map(subject => (
        <SubjectCard key={subject.id} subject={subject} isEnrolled={false} imageSrc={getCourseImage(subject.id).src} />
      ))}
    </div>
  );
}
