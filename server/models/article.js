const mongoose = require('mongoose');
const Comment = require('./comment');
const User = require('./user');

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true, 
            // maxLength: 20000
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        picture: {
            type: String,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        timestamps: true
    }
);

// // remove comments from users and removes the comment
articleSchema.pre('remove', async function(next){
    try {
        for(let i = 0; i < this.comments.length; i++){
            let comment = await Comment.findById(this.comments[i]);
            if(comment === null) continue;
            let user_id = comment.user;
            let user = await User.findById(user_id);
            user.comments.remove(this.comments[i]);
            await user.save();
            await Comment.deleteOne({_id: this.comments[i]});
        }
        return next();
    } catch (err) {
        return next(err);
    }
});

// remove article from user
articleSchema.pre('remove', async function(next){
    try {
        let user = await User.findById(this.user);
        user.articles.remove(this.id);
        await user.save();
        return next(); 
    } catch (err) {
        return next(err);
    }
})

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;