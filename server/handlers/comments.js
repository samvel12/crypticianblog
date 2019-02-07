const db = require('../models');

exports.createComment = async function(req, res, next){
    try {
        let comment = await db.Comment.create({
            text: req.body.text,
            user: req.params.id,
            article: req.params.article_id
        });

        let foundUser = await db.User.findById(req.params.id);
        foundUser.comments.push(comment.id);
        await foundUser.save();

        let foundArticle = await db.Article.findById(req.params.article_id);
        foundArticle.comments.push(comment.id);
        await foundArticle.save();

        let foundComment = await db.Comment.findById(comment._id).populate('user', {
            username: true,
            profileImageUrl: true
        })
        return res.status(200).json(foundComment);
    } catch (err) {
        return next(err);
    }
};

exports.editComment = async function(req, res, next){
    try {
        let user = await db.User.findById(req.params.id);
        const {comments} = user;
        const owner = comments.map(x => String(x)).includes(req.params.comment_id);
        if(owner){
            let comment = await db.Comment.findByIdAndUpdate(req.params.comment_id, 
                    {
                        $set: {
                            text: req.body.text
                        }
                    }, 
                    {
                        new: true
                    }
                );
            return res.status(200).json(comment);
        } else {
            return next({
                status: 401,
                message: 'User is not the owner'
            })
        }
    } catch (err) {
        return next(err);
    }
};

exports.removeComment = async function(req, res, next){
    try {
        let user = await db.User.findById(req.params.id);
        const {comments} = user;
        const owner = comments.map(x => String(x)).includes(req.params.comment_id);
        if(owner || user.isAdmin){
            let comment = await db.Comment.findById(req.params.comment_id);
            await comment.remove();
            return res.status(200).json(comment);
        } else {
            return next({
                status: 401,
                message: 'User is not the owner'
            })
        }
    } catch (err) {
        return next(err)
    }
}