import { useRouter } from 'next/router';
import logo from '../../public/images/logo.png'
import Image from 'next/image';

export default function SelectDegree() {
  const router = useRouter();

  const handleMinorClick = () => {
    router.push('/minor/enroll/allcourses');
  };

  const handleHonoursClick = () => {
    router.push('/honours/enroll/allcourses');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center mb-10">
        <Image src={logo} alt='college-logo'  priority={true} />
      </div>
      <div className="flex flex-col items-center justify-center mb-6">
        <p className=' font-normal text-red text-xl  lg:text-2xl '>Choose Your Degree</p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
          <button
            className="text-red text-lg  lg:text-xl bg-white hover:bg-gray-300  font-normal border-2 w-full border-grey rounded-full py-2 px-20  transition duration-300"
            onClick={handleMinorClick}
          >
            Minor
          </button>
          {/* <button
            className=" text-red text-lg  lg:text-xl bg-white hover:bg-gray-300 font-normal border-2 w-full border-grey rounded-full py-2 px-20  transition duration-300"
            onClick={handleHonoursClick}
          >
            Honours
          </button> */}
      </div>
    </div>
  );
}