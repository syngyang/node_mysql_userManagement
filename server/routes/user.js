const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')

// create, find,
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.addUser);

router.get('/edituser/:id', userController.editUser);

router.post('/edituser/:id', userController.updateUser);
router.get('/viewuser/:id', userController.viewUser);

router.get('/:id', userController.deleteUser);


 module.exports = router;