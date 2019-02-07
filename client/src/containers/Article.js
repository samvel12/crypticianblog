import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchArticles, fetchArticle} from '../store/actions/articles';
import { removeError } from '../store/actions/errors';
import CommentSection from './CommentSection';
import Card from '../components/Card';
import ReactMarkdown from 'react-markdown/with-html';

const defaultImg = "/default_article.jpg";

class Article extends Component {
    componentDidMount(){
        let {article_id} = this.props.match.params;
        this.props.fetchArticle(article_id);
        if(this.props.articles.articles.length === 0) {
            this.props.fetchArticles();
        }
    }

    // to force update once a suggested article is clicked on
    componentDidUpdate(prevProps){
        let {article_id} = this.props.match.params;
        if (prevProps.location.key !== this.props.location.key) {
            this.props.fetchArticle(article_id);
        }
    }

    render(){
        let {title="", text="", picture, _id="", user={username: ""}, comments=[]} = this.props.articles.article;
        let {articles=[]} = this.props.articles;
        const {history, errors} = this.props;

        history.listen(() => {
            this.props.removeError();
        })
        
        const maxSuggestions = 6;

        let suggestionList = articles.filter(a => a._id !== _id).slice(0, maxSuggestions).map(a => (
            <Card
                key={a._id}
                title={a.title}
                text={a.text}
                picture={a.picture}
                username={a.user.username}
                article_id={a._id}
                timestamp={a.createdAt}
            ></Card>
        ))

        return (
            <div>
                {(errors.message && (<div className="error">{errors.message}</div>))}
                {(!errors.message && (<div className="article">
                    <div className="element post">
                        <img 
                            src={(picture || defaultImg)} 
                            alt="thumbnail"
                        />
                        <div className="article-title">
                            <h2>{title}</h2> 
                            <p>by <span>{user.username}</span></p>
                        </div>
                        <ReactMarkdown className="article-main" source={text}></ReactMarkdown>
                        <CommentSection comments={comments}></CommentSection>
                    </div>
                    <div className="suggestion">
                        {suggestionList}
                    </div>
                </div>))}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        articles: state.articles, 
        errors: state.errors
    }
}

export default connect(mapStateToProps, {fetchArticles, fetchArticle, removeError})(Article);

