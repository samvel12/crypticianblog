const db = require('../models');


exports.getArticles = async function(req, res, next){
    try {
        let articles = await db.Article.find()
            .sort({createdAt: 'desc'})
            .populate('user', {
                username: true
            });
        return res.status(200).json(articles);
    } catch (err) {
        next(err);
    };
};

exports.getArticle = async function(req, res, next){
    try {
        let article = await db.Article.findById(req.params.article_id)
            .populate('user', {
                username: true
            })
            .populate({
                path: 'comments',
                populate: {path: 'user', select: 'username profileImageUrl'}
            })
        return res.status(200).json(article);
    } catch (err) {
        return next(err);
    };
};