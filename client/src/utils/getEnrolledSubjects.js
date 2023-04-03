function getEnrolledSubjects(){
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
        }
      ];
      return subjects;
}
export default getEnrolledSubjects;