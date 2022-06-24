const port = 8080

const express = require('express');
var cors = require('cors')
var app = express()

app.use(cors())
app.use('/uploads', express.static('uploads'));

const routes = require('./routes');

app.use(express.json());
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
