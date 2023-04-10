import React from 'react';
import SubjectCard from '../SubjectCard';
import getAllSubjects from '../../utils/getAllSubjects'
import getCourseImage from "../../utils/getCourseImage"
import { useSelector } from 'react-redux';


export default function Subjects() {
  const subjects = useSelector(state => state.subjects.allSubjects)
  const enrolledSubjects = useSelector(state => state.subjects.enrolledSubjects)
  const unenrolledSubjects = subjects.filter(sub  => !enrolledSubjects.some(ensub => ensub.subjectCode === sub.subjectCode))

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 space-x-1 gap-4 md:gap-8">
      {unenrolledSubjects.map(subject => (
        <SubjectCard key={subject.id} subject={subject} isEnrolled={false} imageSrc={getCourseImage(subject.id).src} />
      ))}
    </div>
  );
}
