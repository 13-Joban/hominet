import  { useEffect, useState } from 'react';
import StudentRecord from '../components/StudentRecord';
import { getEnrolledStudents } from '@/api';

const StudentRecordPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentsData = await getEnrolledStudents();
      setData(studentsData);
    };

    fetchData();
  }, []);

  return <StudentRecord data={data} />;
};

export default StudentRecordPage;

