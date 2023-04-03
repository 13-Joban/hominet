import EnrollSubject from '../../../../components/minor/EnrollSubject'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import findSubjectByCode from '../../../../utils/findSubjectByCode'
import getAllSubjects from '../../../../utils/getAllSubjects'
import Layout from '../../../../components/Layout'

function EnrollSubjectPage () {
  const router = useRouter()
  const subjectCode = router.query.subjectCode
  // console.log('subjectCode  at time =  ' , Date.now().toLocaleString());
  const subjects = getAllSubjects();
  const subject = findSubjectByCode(subjects, subjectCode);
  const subjectName = subject && subject.subjectName;


  return (
    <Layout>
      <EnrollSubject
        subjectName={subjectName}
        subjectCode={subjectCode}
      />
    </Layout>
  )
}

export default EnrollSubjectPage
