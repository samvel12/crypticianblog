const db = require('../models');


exports.createArticle = async function(req, res, next){
    try {
        let article = await db.Article.create({
            title: req.body.title,
            text: req.body.text,
            user: req.params.id, 
            picture: req.body.picture
        })
        let foundUser = await db.User.findById(req.params.id);
        foundUser.articles.push(article.id);
        await foundUser.save();
        let foundArticle = await db.Article.findById(article._id).populate('user', {
            username: true
        });
        return res.status(200).json(foundArticle);
    } catch (err) {
        next(err);
    }
}

exports.updateArticle = async function(req, res, next){
    try {
        let user = await db.User.findById(req.params.id);
        const {articles} = user;
        const owner = articles.map(x => String(x)).includes(req.params.article_id);
        if(owner){
            let article = await db.Article.findByIdAndUpdate(req.params.article_id,
                    {
                        $set: {
                            title: req.body.title,
                            text: req.body.text,
                            picture: req.body.picture
                        }
                    },
                    {
                        new: true
                    }
                );
            return res.status(200).json(article);
        } else {
            return next({
                status: 401,
                message: 'User is not the owner'
            })
        }
    } catch (err) {
        return next(err);
    }
}

exports.deleteArticle = async function(req, res, next){
    try {
        let user = await db.User.findById(req.params.id);
        const {articles} = user;
        const owner = articles.map(x => String(x)).includes(req.params.article_id);
        if(owner){
            let article = await db.Article.findById(req.params.article_id);
            await article.remove();
            return res.status(200).json(article);
        } else {
            return next({
                status: 401,
                message: 'User is not the owner'
            })
        }
    } catch (err) {
        return next(err);
    }
}
