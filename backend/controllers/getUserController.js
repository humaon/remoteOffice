const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.getUser = async (req,res,next) => {

    try{
     

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
                sucess:"false"
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
      
        const decoded = jwt.verify(theToken, 'remoteOffice');
        console.log('decoded',decoded);

        const [row] = await conn.execute(
            "SELECT `id`,`name`,`email`,`profileImage`,`dateOfBirth`,`role`,`attachment` FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        if(row.length > 0){
            return res.json({
                user:row[0]
            });
        }

        return res.status(422).json({
            message: "NO user found",
            sucess:"false"
        });
        
    }
    catch(err){
        next(err);
    }
}