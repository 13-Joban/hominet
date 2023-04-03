import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import findSubjectByCode from '../../../../utils/findSubjectByCode'
import getAllSubjects from '../../../../utils/getAllSubjects'
import Layout from '../../../../components/Layout'
import EnrollSubject from '../../../../components/minor/EnrollSubject'

function EnrollSubjectPage() {
  const router = useRouter()
  const { subjectCode } = router.query
  const subjects = getAllSubjects()
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
      <EnrollSubject
        subjectName={subject.subjectName}
        subjectCode={subject.subjectCode}
      />
    </Layout>
  )
}

export default EnrollSubjectPage
