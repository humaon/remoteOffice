const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "remoteofficetest.cvmmma3xf7m2.ap-south-1.rds.amazonaws.com", // HOST NAME
    port:3306,
    user: "admin", // USER NAME
    database: "remoteOffice", // DATABASE NAME
    password: "123456", // DATABASE PASSWORD
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;