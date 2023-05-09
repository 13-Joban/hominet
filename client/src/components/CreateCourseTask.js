import React from 'react'
import Image from 'next/image';
import Link from 'next/link'
import locofy from '../../public/images/gndec-fotor-bg-remover-20230410223713.png'
const CreateCourseTask = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800">
        <div className="px-4 py-5 border-b border-gray-700">
          <div className="flex items-center justify-center">
            <Image src={locofy} alt="Logo" width={48} height={48} />
            <span className="ml-2 text-white font-medium text-lg">My Dashboard</span>
          </div>
        </div>
        <div className="mt-2">
          <a href="/admindash" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">Dashboard</a>
          <a href="#" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white mt-1">Students Record</a>
        </div>
      </div>
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Add Course</h1>
      <form className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-medium mb-2" htmlFor="id">
            ID
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            id="id"
            name="id"
            type="text"
            placeholder="Enter ID"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-medium mb-2" htmlFor="institute">
            Institute
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            id="institute"
            name="institute"
            type="text"
            placeholder="Enter Institute"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-medium mb-2" htmlFor="duration">
            Duration
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            id="duration"
            name="duration"
            type="text"
            placeholder="Enter Duration"
          />
        </div>
        <div className="col-span-2">
          <label className="block font-medium mb-2" htmlFor="nptelLink">
            NPTEL Link
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            id="nptelLink"
            name="nptelLink"
            type="text"
            placeholder="Enter NPTEL Link"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-medium mb-2" htmlFor="session">
            Session
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            id="session"
            name="session"
            type="text"
            placeholder="Enter Session"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block font-medium mb-2" htmlFor="enrollmentEndDate">
            Enrollment End Date
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            id="enrollmentEndDate"
            name="enrollmentEndDate"
            type="text"
            placeholder="Enter Enrollment End Date"
          />
        </div>
        <div className="col-span-2">
          <label className="block font-medium mb-2" htmlFor="status">
            Status</label>
            <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            id="status"
            name="status"
            type="text"
            placeholder="Enter status"
          />
         </div>
         <div className="col-span-2">
         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow center">Create Course</button>
        </div>
         </form>
         </div>
         </div>
  )}
  export default CreateCourseTask