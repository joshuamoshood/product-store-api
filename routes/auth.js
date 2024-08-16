const express = require('express');
const {register,login, renderAuth, renderSignUp}=require('../controllers/auth');

const router = express.Router();
router.route("/").get(renderAuth);
router.route('/register').post(register);
router.route('/login').post(login);
router.route("/sign-up").get(renderSignUp);

module.exports = router;