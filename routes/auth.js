const express = require('express');

const { register, login, deleteUser, updateDetails, updatePassword, forgotPassword, resetPassword,} = require('../controller/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:id', deleteUser)
router.put('/updatedetails/:id', updateDetails)
router.put('/updatepassword/:id', updatePassword)
router.post('/forgotpassword/', forgotPassword)
router.put('/resetpassword/:reset token', resetPassword )

module.exports = router;