const express = require('express');
const router = express.Router();
const accessTokenPolicy = require('#policies/accessToken.policy');
const ClientController = require('#controllers/api/ClientController')();

router.use(accessTokenPolicy);
router.get('/dashboard', ClientController.getDashboard);
router.put('/profile/:clientId', ClientController.updateProfile);

module.exports = router;
