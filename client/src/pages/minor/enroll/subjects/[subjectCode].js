import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import findSubjectByCode from '../../../../utils/findSubjectByCode'
// import getAllSubjects from '../../../../utils/getAllSubjects'
import Layout from '../../../../components/Layout'
import EnrollSubject from '../../../../components/minor/EnrollSubject'
import { getSubjectByCode } from '../../../../api'

function EnrollSubjectPage() {
  const router = useRouter()
  const { subjectCode } = router.query

   const dispatch = useDispatch()
  const selectedSubject = useSelector(state => state.subjects.selectedSubject)

  useEffect(() => {
    if (subjectCode) {
      dispatch(getSubjectByCode(subjectCode))
    }
  }, [subjectCode])

  if (!subjectCode || selectedSubject === null) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <EnrollSubject
        subjectName={selectedSubject.subjectName}
        subjectCode={selectedSubject.subjectCode}
      />
    </Layout>
  )
}

export default EnrollSubjectPage
