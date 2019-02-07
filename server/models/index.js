const mongoose = require('mongoose');
// mongoose.set('debug', true);
mongoose.Promise = Promise;

const USER = process.env.mlabUser;
const PASSWORD = process.env.mlabPassword;

mongoose.connect(`mongodb://${USER}:${PASSWORD}@ds141621.mlab.com:41621/demo`, {useNewUrlParser: true});


module.exports.User = require('./user');
module.exports.Article = require('./article');
module.exports.Comment = require('./comment');
