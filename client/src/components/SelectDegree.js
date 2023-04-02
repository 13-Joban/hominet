import { useRouter } from 'next/router';

function SelectDegree() {
  const router = useRouter();

  const handleMinorClick = () => {
    router.push('/minor/enroll/allcourses');
  };

  const handleHonoursClick = () => {
    router.push('/honours/enroll/allcourses');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4">
          <button
            className="bg-carrot bg-red-400 rounded-md py-2 px-20 hover:text-carrot transition duration-300"
            onClick={handleMinorClick}
          >
            Minor
          </button>
          <button
            className="bg-carrot bg-red-400 rounded-md py-2 px-20 hover:text-carrot transition duration-300"
            onClick={handleHonoursClick}
          >
            Honours
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectDegree;
