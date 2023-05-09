import Link from 'next/link'

export default function CourseCard ({ course, isEnrolled, imageSrc }) {
  return (
    <div className='shadow-md rounded-md overflow-hidden hover:cursor-pointer hover:shadow-lg transition duration-200 h-full'>
      <Link
        href={
          isEnrolled
            ? `/minor/enrolled/courses/${course.id}`
            : `/minor/enroll/courses/${course.id}`
        }
        passHref
        legacyBehavior
      >
        <a>
          <img
            className='h-40 w-full object-cover'
            src={imageSrc.src}
            alt={course.name}
          />
          <div className='p-2 h-30 overflow-hidden'>
            <h2 className='text-md font-normal mb-1 leading-6'>{course.name}</h2>
            <p className='text-gray-600 mb-0'>UG</p>
          </div>
        </a>
      </Link>
    </div>
  )
}
