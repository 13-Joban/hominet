function findSubjectByCode(subjects, subjectCode) {
    return subjects.find(subject => subject.subjectCode  === subjectCode);
  }

export default findSubjectByCode;