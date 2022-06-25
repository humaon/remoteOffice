const router = require('express').Router();
const {body} = require('express-validator');
const multer  = require('multer');
const path = require('path');
var storage = multer.diskStorage({
 
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  
  filename: function (req, file, cb) {
    
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})
 
const upload = multer({ storage: storage })

const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const {getAllUsers, editUser, getSingleUser} = require('./controllers/adminController');

router.post('/register',upload.fields([{

  name: 'profileImage', maxCount: 1
}, {
  name: 'attachment', maxCount: 1
}]), [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);
router.get('/singleUser/:id',getSingleUser);
router.patch('/updateUser',upload.fields([{
  name: 'profileImage', maxCount: 1
}, {
  name: 'attachment', maxCount: 1
}]),editUser);
router.get('/getAllUsers',getAllUsers);
getAllUsers








module.exports = router;