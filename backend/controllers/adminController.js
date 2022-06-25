const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.getAllUsers = async (req,res,next) => {

    try{
 

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
      
        const decoded = jwt.verify(theToken, 'remoteOffice');
    

        const [row] = await conn.execute(
            "SELECT `role` FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        if(row.length > 0){
            console.log(row[0].role);

            if(row[0].role == 'admin')
            {
                const [rows] = await conn.execute(
                    "SELECT  `id`,`name`,`email`,`profileImage`,`dateOfBirth`,`role` FROM users where `role` = 'user'",
                   
                );
                 res.json(rows);

            }
            res.json({
                message:"sorry you are not admin"
            });
            
        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        console.log(err);
        next(err);
    }
}
exports.editUser = async (req,res,next) => {
   

    try{
     console.log(req.body);

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
      
        const decoded = jwt.verify(theToken, 'remoteOffice');
    

        const [row] = await conn.execute(
            "SELECT `role` FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        if(row.length > 0){
            
            const id = req.body.id;
            if(row[0].role == 'admin')
            {
                const [checkUniqueMail] = await conn.execute(
                    "SELECT `email` FROM `users` WHERE `id` != ? & `email` = ?",
                    [req.body.id,req.body.email]
                );
           if(checkUniqueMail.length>0){
            return res.status(422).json({
                message: "Please provide an unique email adress",
            });
           }
            const query = `UPDATE ??
                   SET ?? = ?, ?? = ? , ?? = ?
                   WHERE ?? = ?`;
    const values = ['users', 'name', req.body.name, 'dateOfBirth', req.body.dateOfBirth,'email',req.body.email, 'id', req.body.id];

    const rows = await conn.query(query, values)
    res.json({
        message:"successfully updated",
        
    });      
                
            }
            else{
                res.json({
                    message:"sorry you are not admin"
                });
                
            }
            
          
        }
        else{
            res.json({
                message:"No user found"
            });
        
        }
    
      
        
    }
    catch(err){
        console.log(err);

        next(err);
    }
}


exports.getSingleUser = async (req,res,next) => {

    try{
       
  

     console.log('aadmin');

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
      
        const decoded = jwt.verify(theToken, 'remoteOffice');
    

        const [row] = await conn.execute(
            "SELECT `role` FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        if(row.length > 0){
            
            const id = req.body.id;
            if(row[0].role == 'admin')
            {
                const [row] = await conn.execute(
                    "SELECT  `id`,`name`,`email`,`profileImage`,`dateOfBirth`,`role`,`attachment` FROM users where `id` = ?",[req.params.id]
                   
                );
                if(row.length >0){
                    res.json(row[0]);
                }
               
        
         
                
            }
            else{
                res.json({
                    message:"sorry you are not admin"
                });
                
            }
            
          
        }
        else{
            res.json({
                message:"No user found"
            });
        
        }
    
      
        
    }
    catch(err){
        next(err);
    }
}