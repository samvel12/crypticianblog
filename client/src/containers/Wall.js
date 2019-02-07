import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchArticles} from '../store/actions/articles';
import Card from '../components/Card';
import '../css/App.css';

class Wall extends Component {
    componentDidMount(){
        this.props.fetchArticles();
    };

    render(){
        const {articles} = this.props;
        let articleList = articles.map((a, i) => (
            <Card
                key={a._id}
                article_id={a._id}
                title={a.title}
                picture={a.picture}
                username={a.user.username}
                timestamp={a.createdAt}
            ></Card>
        ))

        return (
            <div className="wall">{articleList}</div>
        )
    };
};

function mapStateToProps(state){
    return {
        articles: state.articles.articles
    };
};

export default connect(mapStateToProps, {fetchArticles})(Wall);