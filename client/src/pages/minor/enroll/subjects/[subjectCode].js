import EnrollSubject from '../../../../components/minor/EnrollSubject';
import { useRouter } from "next/router";
import findSubjectByCode from '../../../../utils/findSubjectByCode'
import findAllSubjects from '../../../../utils/findAllSubjects'

const subjects = findAllSubjects();

function EnrollSubjectPage() {
  const router = useRouter();
  const subjectCode = router.query.subjectCode;
  const subject = findSubjectByCode(subjects, subjectCode);
  
  console.log(subjectCode);
  console.log(subject);

  return <EnrollSubject subjectName={subject.subjectName} subjectCode={subjectCode}  />;
}

export default EnrollSubjectPage;
