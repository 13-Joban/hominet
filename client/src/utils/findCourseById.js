function findCourseById(courses, courseId) {
    return courses.find(course => course.courseId === courseId);
  }

export default findCourseById;
