const express = require('express');
const router = express.Router({mergeParams: true});

const {getArticles, getArticle} = require('../handlers/articles');

router.route('/').get(getArticles);
router.route('/:article_id').get(getArticle);

module.exports = router;