import CourseImg1 from '../../public/images/Course_img_1.jpeg';
import CourseImg2 from '../../public/images/Course_img_2.jpeg';
import CourseImg3 from '../../public/images/Course_img_3.jpeg';
import CourseImg4 from '../../public/images/Course_img_4.jpeg';
import CourseImg5 from '../../public/images/Course_img_5.jpeg';
import CourseImg6 from '../../public/images/Course_img_6.jpeg';
import CourseImg7 from '../../public/images/Course_img_7.jpeg';

const images = [CourseImg1, CourseImg2, CourseImg3, CourseImg4, CourseImg5, CourseImg6, CourseImg7]
export default function getCourseImage(index) {
  
    return images[index-1];
  }
  