function getAllSubjects(){
    const subjects = [
        {
          id: 1,
          subjectName: 'Computer Graphics',
          subjectCode: 'MnPCCS106',
          subjectType: 'Theory',
          credits: 4,
          session: 'January-June',
          academicYear: '2023',
          description: 'Graphics in the computers',
          image: 'https://example.com/graphics.jpg',
          isEnrolled: false,
          isCompleted: false
        },
        {
          id: 2,
          subjectName: 'Computer Graphics Laboratory',
          subjectCode: 'MnLPCCS106',
          subjectType: 'Practical',
          credits: 1,
          session: 'January-June',
          academicYear: '2023',
          description: 'Graphics in the computers',
          image: 'https://example.com/lab.jpg',
          isEnrolled: false,
          isCompleted: false
        },
        {
          id: 3,
          subjectName: 'Machine Learning',
          subjectCode: 'MnLPCCS107',
          subjectType: 'Theory',
          credits: 3,
          session: 'January-June',
          academicYear: '2023',
          description: 'Study about machine learning',
          image: 'https://example.com/lab.jpg',
          isEnrolled: false,
          isCompleted: false
        }
      ];
      return subjects;
}
export default getAllSubjects;