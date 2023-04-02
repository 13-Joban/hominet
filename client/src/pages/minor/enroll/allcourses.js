import React from 'react'
import Courses from '../../../components/minor/Courses'
import Subjects from '../../../components/minor/Subjects'

function Enroll() {
  return (
    <div className="flex flex-col justify-between min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 sm:text-3xl">List of Available Subjects</h1>
        <Subjects />
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 sm:text-3xl">List of Available Courses</h1>
        <Courses />
      </div>
    </div>
  )
}

export default Enroll
