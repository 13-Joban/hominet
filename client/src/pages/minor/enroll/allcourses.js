import React from 'react'
import Courses from '../../../components/minor/Courses'

function enroll() {
  return (
    <div className="container mx-auto">
    <h1 className="text-3xl font-bold mb-4">List of available MOOC courses for minor engineering degree</h1>
    <Courses />
  </div>
  )
}

export default enroll
