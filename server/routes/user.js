const express = require('express');
const router = express.Router({mergeParams: true});

const {getUserInfo} = require('../handlers/user');

// /api/user/:id
router.route('/')
    .get(getUserInfo)

module.exports = router;