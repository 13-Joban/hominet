import { useSelector } from 'react-redux';
import Navbar from './Navbar';

export default function Layout({ children }) {
  // Assuming your student slice has a property named 'degreeType'
  const degreeType = useSelector((state) => state.student.user?.degreeType);

  return (
    <>
      <Navbar degreeType={degreeType} />
      <main>{children}</main>
    </>
  );
}
