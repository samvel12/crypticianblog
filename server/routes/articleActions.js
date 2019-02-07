const express = require('express');
const router = express.Router({mergeParams: true});

const { createArticle, deleteArticle, updateArticle } = require('../handlers/articleActions');

//prefix - /api/users/:id/articles
router.route('/').post(createArticle);

//prefix - /api/users/:id/articles/:article_id
router.route('/:article_id')
    .put(updateArticle)
    .delete(deleteArticle);

module.exports = router;
