const express = require('express');
const port = process.env.port

const app = express();


app.listen(() => {
    console.log('app is listening at port  400' + port)
}) 