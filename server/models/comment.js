const mongoose = require('mongoose');
const User = require('./user');

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            // maxLength: 20000
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }   
    },
    {
        timestamps: true
    }
);

// removes comment from user
commentSchema.pre('remove', async function(next){
    try {
        let user = await User.findById(this.user);
        user.comments.remove(this.id);
        await user.save();
        return next();
    } catch (err) {
        return next(err);
    }
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;