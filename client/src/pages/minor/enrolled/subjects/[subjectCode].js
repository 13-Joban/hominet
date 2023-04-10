import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import findSubjectByCode from '../../../../utils/findSubjectByCode'
import getAllSubjects from '../../../../utils/getAllSubjects'
import Layout from '../../../../components/Layout'
import EnrolledSubject from '../../../../components/minor/EnrolledSubject'
import { useSelector } from 'react-redux'

function EnrolledSubjectPage() {
  const router = useRouter()
  const { subjectCode } = router.query
  const subjects = useSelector(state => state.subjects.enrolledSubjects)
  const [subject, setSubject] = useState(null)

  useEffect(() => {
    if (subjectCode) {
      const foundSubject = findSubjectByCode(subjects, subjectCode)
      setSubject(foundSubject)
    }
  }, [subjectCode])

  if (!subjectCode || subject === null) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <EnrolledSubject
        subjectName={subject.subjectName}
        subjectCode={subjectCode}
        credits={subject.credits}
      />
    </Layout>
  )
}

export default EnrolledSubjectPage
