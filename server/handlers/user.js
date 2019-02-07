const db = require('../models');

exports.getUserInfo = async function(req, res, next){
    try {
        let user = await db.User.findById(req.params.id)
            .select('-password')
            .populate({
                path:'articles',
                select: 'title createdAt'
            })
            .populate({
                path: 'comments',
                select: 'text article createdAt',
                populate: {path: 'article', select: 'title'}
            })
        return res.status(200).json(user);    
    } catch (err) {
        next(err);
    }
}