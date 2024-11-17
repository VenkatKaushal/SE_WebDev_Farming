const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refreshToken, ForgetPassword} = require( '../controller/authControllers');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.put('/forget',ForgetPassword);

module.exports = router;