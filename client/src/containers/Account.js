import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {getActivity} from '../store/actions/user';
import {removeArticle} from '../store/actions/articles';
import {removeError} from '../store/actions/errors';
import AccountArticleItem from '../components/AccountArticleItem';
import AccountCommentItem from '../components/AccountCommentItem';

const defaultImg = "/default_avatar.png";

class Account extends Component {
    componentWillMount(){
        if(!this.props.currentUser.isAuthenticated){
            this.props.history.push("/signin");
        }
    }

    componentWillUpdate(nextProps){
        if(!nextProps.currentUser.isAuthenticated){
            this.props.history.push("/signin");
        }
    }

    componentDidMount(){
        let {user_id} = this.props.match.params;
        this.props.getActivity(user_id);
    }

    handleRemove = (article_id) => {
        this.props.removeArticle(article_id);
    }

    render(){
        const {articles=[], comments=[], username="", isAdmin} = this.props.currentUser.activity;
        const {id:user_id, createdAt, profileImageUrl=""} = this.props.currentUser.user;
        const {errors, history} = this.props;

        let avatar = null;
        profileImageUrl === "" ? avatar = defaultImg : avatar = profileImageUrl; 

        history.listen(() => {
            this.props.removeError();
        })

        const maxShow = 7;

        let articleList = articles.slice(0, maxShow).map(a => (
            <AccountArticleItem
                key={a._id}
                id={a._id}
                title={a.title}
                timestamp={a.createdAt}
                remove={this.handleRemove.bind(this, a._id)}
            ></AccountArticleItem>
        ))

        let commentList = comments.slice(0, maxShow).map(c => (
            <AccountCommentItem
                key={c._id}
                text={c.text}
                article_id={c.article._id}
                articleTitle={c.article.title}
                timestamp={c.createdAt}
            ></AccountCommentItem>
        ))

        return (
            <div>
                {(errors.message && (<div className="error">{errors.message}</div>))}
                {(!errors.message && (<div className="account">
                    <div 
                        className={isAdmin ? "element account-flex account-info": "element notadmin-flex-info account-info"}
                    >
                        <h3>Your Info</h3>
                        <img 
                            src={avatar} 
                            alt="Profile"
                        />
                        <hr/>
                        <p><span className="info-heading">Username:</span> {username}</p>
                        <p><span className="info-heading">Registered:</span> <Moment format="HH:mm MMM DD, YYYY">{createdAt}</Moment></p>
                    </div>
                    {(isAdmin && (
                    <div className="element account-flex account-articles">
                        <h3>Your Articles</h3>
                        {articleList}
                        <Link id="all-articles" to={`/account/${user_id}/articles`}>view all</Link>
                    </div>
                    ))}
                    <div 
                        className={isAdmin ? "element account-flex account-comment" : "element notadmin-flex-comment"}
                    >
                        <h3>Your Comments</h3>
                        {commentList}
                        <Link id="all-comments" to={`/account/${user_id}/comments`}>view all</Link>
                    </div>
                </div>))}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {getActivity, removeArticle, removeError})(Account);
