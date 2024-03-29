const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
dotenv.config({
    path: './config.env'
});
const port = process.env.port || 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


// synchronize the models with the database
sequelize.sync();

// include course routes
const courseRoutes = require('./routes/Course');
const adminRoutes = require('./routes/admin');
const systemManagerRoutes = require('./routes/SystemManager');
const studentRoutes = require('./routes/Student');
const subjectRoutes = require('./routes/Subject');

  
app.use('/api/system-manager', systemManagerRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', studentRoutes);
app.use('/api/subjects', subjectRoutes);


app.listen(port, () => {
    console.log('app is listening at port ' + port)
})


module.exports = app;