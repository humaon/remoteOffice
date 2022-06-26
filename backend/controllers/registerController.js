const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {


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
          console.log(row);

        if (row.length > 0) {
            return res.status(422).json({
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