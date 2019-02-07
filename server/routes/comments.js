const express = require('express');
const router = express.Router({mergeParams: true});

const {createComment, editComment, removeComment} = require('../handlers/comments');

// /api/users/:id/comments/:article_id
router.route('/')
    .post(createComment);

// /api/users/:id/comments/:article_id/:comment_id
router.route('/:comment_id')
    .put(editComment)
    .delete(removeComment);

module.exports = router;