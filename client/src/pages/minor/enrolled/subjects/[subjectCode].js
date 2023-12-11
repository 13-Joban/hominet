import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrolledSubjects, getAllSubjects } from '../../../../api';
import Layout from '../../../../components/Layout';
import EnrolledSubject from '../../../../components/minor/EnrolledSubject';

function EnrolledSubjectPage() {
  const router = useRouter();
  const { subjectCode } = router.query;
  const dispatch = useDispatch();

  // Use useSelector to get data from the Redux store
  const enrolledSubjects = useSelector((state) => state.subjects.enrolledSubjects);
  // const allSubjects = useSelector((state) => state.subjects.allSubjects);

  // Find the selected subject using array methods
  const selectedSubject = enrolledSubjects.find((sub) => sub.subjectCode === subjectCode);

  useEffect(() => {
    if (subjectCode) {
      dispatch(fetchEnrolledSubjects());
      dispatch(getAllSubjects());
    }
  }, [subjectCode, dispatch]);

  if (!subjectCode || selectedSubject == null) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <EnrolledSubject
        isCompleted={selectedSubject.isCompleted}
        selectedEnrolledSubject={selectedSubject}
        subjectName={selectedSubject.Subject.subjectName}
        subjectCode={subjectCode}
        credits={selectedSubject.Subject.credits}
      />
    </Layout>
  );
}

export default EnrolledSubjectPage;
