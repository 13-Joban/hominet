import  { useEffect, useState } from 'react';
import StudentRecord from '../../../components/StudentRecord';
import { getEnrolledStudents } from '@/api';

const StudentRecordPage = () => {
  const [data, setData] = useState([]);
  const hardcodedDegreeType = 'Minor';

  useEffect(() => {
    const fetchData = async () => {
      const studentsData = await getEnrolledStudents(hardcodedDegreeType);
      setData(studentsData);
    };

    fetchData();
  }, [hardcodedDegreeType]);

  return <StudentRecord data={data} />;
};

export default StudentRecordPage;

