const express = require('express');
const dotenv  = require('dotenv');
const sequelize = require('./config/database');
const app = express();
dotenv.config({ path: './config.env' });
const port = process.env.port || 4040;

app.use(express.json());

// synchronize the models with the database
sequelize.sync();

// include course routes
const courseRoutes = require('./routes/Course');
const adminRoutes = require('./routes/admin');


app.use('/api', courseRoutes);
app.use('/api/admin', adminRoutes);



app.listen(port, () => {
    console.log('app is listening at port ' + port)
}) 


module.exports = app;