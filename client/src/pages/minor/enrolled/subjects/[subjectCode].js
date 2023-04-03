import EnrolledSubject from '../../../../components/minor/EnrolledSubject'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import findSubjectByCode from '../../../../utils/findSubjectByCode'
import getAllSubjects from '../../../../utils/getAllSubjects'
import Layout from '../../../../components/Layout'

function EnrolledSubjectPage () {
  const router = useRouter()
  const subjectCode = router.query.subjectCode
  // console.log('subjectCode  at time =  ' , Date.now().toLocaleString());
  const subjects = getAllSubjects();
  const subject = findSubjectByCode(subjects, subjectCode);
  const subjectName = subject && subject.subjectName;


  return (
    <Layout>
      <EnrolledSubject
        subjectName={subjectName}
        subjectCode={subjectCode}
      />
    </Layout>
  )
}

export default EnrolledSubjectPage
