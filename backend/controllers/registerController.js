const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {




    // var sql = "CREATE TABLE users (name VARCHAR(255)  NOT NULL,profileImage` varchar(255) NOT NULL,dateOfBirthvarchar(255) NOT NULL,email varchar(255) NOT NULL,attachment varchar(255) NOT NULL,password varchar(255) NOT NULL,createdAt datetime NOT NULL DEFAULT current_timestamp(),updatedAt datetime NOT NULL DEFAULT current_timestamp(), role varchar(100) NOT NULL DEFAULT 'user')";
    // await conn.execute(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table created");
    // });
    console.log(req.body.email);
   
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `users`(`name`,`email`,`password`,`dateOfBirth`,`profileImage`,`attachment`) VALUES(?,?,?,?,?,?)',[
            req.body.name,
            req.body.email,
            hashPass,
            req.body.dateOfBirth,
            req.files.profileImage[0].path,
            req.files.attachment[0].path,

        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }
}