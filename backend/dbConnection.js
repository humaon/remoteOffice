const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "localhost", // HOST NAME
    port:3306,
    user: "phpmyadmin", // USER NAME
    database: "remoteOffice", // DATABASE NAME
    password: "emon@121", // DATABASE PASSWORD
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;