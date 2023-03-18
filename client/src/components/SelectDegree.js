import React from 'react';

function SelectDegree() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4">
          <button className="bg-carrot bg-red-400 rounded-md py-2 px-20 hover:text-carrot transition duration-300">Minor</button>
          <button className="bg-carrot bg-red-400 rounded-md py-2 px-20 hover:text-carrot transition duration-300">Honours</button>
        </div>
      </div>
    </div>
  );
}

export default SelectDegree;
