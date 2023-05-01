// const Student = require('./models/Student');
// const bcrypt = require('bcryptjs');
// const dotenv  = require('dotenv');
// dotenv.config({ path: './config.env' });



// const AddDummyStudent = async () => {
//     const password = process.env.dummystudentpassword // Dummy password

// // Hash the password before storing it in the database
// const hashedPassword = await bcrypt.hash(password, 10);


// const dummyStudent = {
//   crn: '2015066',
//   password: hashedPassword,
// };

// // Create a new record in the students table
// await Student.create(dummyStudent).then((dummyStudent) => {
//     console.log("new student added to db");
//     console.log(dummyStudent);
// }).catch((err) => {
//     console.log('Error in adding student to db');
// })
// }


