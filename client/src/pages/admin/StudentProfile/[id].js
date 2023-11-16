import { useRouter } from 'next/router'
import StudentProfile from '../../../components/StudentProfile' // Import your StudentProfile component
import { getStudentData } from '../../../api' // Import your getStudentData function
import { useEffect, useState } from 'react' // Import useEffect and useState from 'react'


const StudentProfilePage = () => {
  const router = useRouter()
  const { id } = router.query

  

  // console.log(id);
  // Define a state variable to store the fetched student data
  const [studentData, setStudentData] = useState(null)

  useEffect(() => {
    // Check if the 'id' parameter exists
    if (id) {
      // Call the getStudentData function to fetch student data by 'id' (CRN)
      getStudentData(id)
        .then(data => {
          // Set the fetched student data to the state variable
          console.log(studentData)
          setStudentData(data)
        })
        .catch(error => {
          // Handle errors, e.g., display an error message
          console.error('Error fetching student data:', error)
        })
    }
  }, [id]) // Trigger the effect whenever 'id' changes

  if (!studentData) {
    // Handle the case when the student data is still loading
    return <div>Loading...</div>
  }
  console.log('studentData', studentData)

  //   if (!studentData.crn) {
  //     // Handle the case when the student is not found (e.g., show an error message)
  //     return <div>Student not found</div>;
  //   }

  return <StudentProfile studentData={studentData} />
}

export default StudentProfilePage
