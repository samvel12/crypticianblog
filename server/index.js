// require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const articleActionRoutes = require('./routes/articleActions');
const commentRoutes = require('./routes/comments');
const articleRoutes = require('./routes/articles');
const userRoutes = require('./routes/user');
const {loginRequired, ensureCorrectUser, checkAdmin} = require('./middleware/auth');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// routes 
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/user/:id', loginRequired, ensureCorrectUser, userRoutes);
app.use('/api/users/:id/articles', loginRequired, ensureCorrectUser, checkAdmin, articleActionRoutes); 
app.use('/api/users/:id/comments/:article_id', loginRequired, ensureCorrectUser, commentRoutes);

app.use(function(req, res, next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`);
});