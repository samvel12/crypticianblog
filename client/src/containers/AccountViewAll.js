import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getActivity} from '../store/actions/user';
import {removeArticle} from '../store/actions/articles';
import AccountArticleItem from '../components/AccountArticleItem';
import AccountCommentItem from '../components/AccountCommentItem';


class AccountViewAll extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 10
        }
    }

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

    handleRemove = async (article_id) => {
        await this.props.removeArticle(article_id);
        this.checkPage();
    }

    checkPage = () => {
        const {articles} = this.props.currentUser.activity;
        const {currentPage, itemsPerPage} = this.state;
        const totalPages = Math.ceil(articles.length / itemsPerPage);
        if(currentPage > totalPages){
            this.setState({
                currentPage: totalPages,
                itemsPerPage: 10
            })
        }
    }

    changePage = (direction, length) => {
        const {currentPage, itemsPerPage} = this.state;
        const totalPages = Math.ceil(length / itemsPerPage);
        let nextPage = currentPage;
        if(direction === "left" && currentPage > 1) nextPage--;
        if(direction === "right" && currentPage < totalPages) nextPage++;
        this.setState({
            currentPage: nextPage,
            itemsPerPage: 10
        })
    }

    render(){
        const {type} = this.props;        
        const {articles=[], comments=[], isAdmin} = this.props.currentUser.activity;
        const {currentPage, itemsPerPage} = this.state;

        let Length = null;
        if(type === "articles" && isAdmin){
            Length = articles.length;
        } else if(type === "comments"){
            Length = comments.length;
        }

        const totalPages = Math.ceil(Length / itemsPerPage);
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;

        let articleList = []
        let commentList = []
        if(type === "articles" && isAdmin){
            articleList = articles.slice(start, end).map(a => (
                <AccountArticleItem
                    key={a._id}
                    id={a._id}
                    title={a.title}
                    timestamp={a.createdAt}
                    remove={this.handleRemove.bind(this, a._id)}
                ></AccountArticleItem>
            ))
        } else if(type === "comments"){
            commentList = comments.slice(start, end).map(c => (
                <AccountCommentItem
                    key={c._id}
                    text={c.text}
                    article_id={c.article._id}
                    articleTitle={c.article.title}
                    timestamp={c.createdAt}
                ></AccountCommentItem>
            ))
        }


        return (
            <div>
                <div className="element pagination">
                    <p>{`page ${currentPage} of ${totalPages}`}</p>
                    {((type === "articles" && isAdmin) && (<div className="navigation">
                        <button className="btn-icon icon-orange" onClick={this.changePage.bind(this, "left", Length)}><i className="fas fa-angle-left"></i></button>
                        <button className="btn-icon icon-orange" onClick={this.changePage.bind(this, "right", Length)}><i className="fas fa-angle-right"></i></button>
                    </div>))}
                    {(type === "comments" && (<div className="navigation">
                        <button className="btn-icon icon-orange" onClick={this.changePage.bind(this, "left", Length)}><i className="fas fa-angle-left"></i></button>
                        <button className="btn-icon icon-orange" onClick={this.changePage.bind(this, "right", Length)}><i className="fas fa-angle-right"></i></button>
                    </div>))}
                </div>
                <div className="element account account-all">
                    {((type === "articles" && isAdmin) && (<div className="account-flex account-articles">
                        <h3>Your Articles</h3>
                        {articleList}
                    </div>))}
                    {(type === "comments" && (<div className="account-flex account-articles">
                        <h3>Your Comments</h3>
                        {commentList}
                    </div>))}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {getActivity, removeArticle})(AccountViewAll);
