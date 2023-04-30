const app = require('./app'); 
const sequelize = require('./config/database');


const port = process.env.PORT || 4040;

// synchronize the models with the database
sequelize.sync();

app.listen(() => {
    console.log('app is listening at port ' + port)
}) 