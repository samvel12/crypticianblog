import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchArticle, updateArticle} from '../store/actions/articles';
import {addError, removeError} from '../store/actions/errors';


class ArticleForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            text: "",
            picture: ""
        };
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const {_id} = this.props.article;
        const {title, text, picture} = this.state;
        const err = this.checkErrors();
        if(err){
            this.props.updateArticle({title, text, picture}, _id)
                .then(() => {
                    this.setState({
                        title: "",
                        text: "", 
                        picture: ""
                    });
                })
                .then(() => {
                    this.props.history.push(`/articles/${_id}`);
                })
                .catch(() => {
                    this.props.addError("Submission failed. Please try again")
                })
        } 
    }

    checkErrors = () => {
        const {title, text} = this.state;
        if(title === ""){
            this.props.addError("Please add a title")
            return false;
        } else if(text === ""){
            this.props.addError("Please add text")
            return false;
        } else {
            return true;
        }
    }

    async componentDidMount(){
        const {id=""} = this.props.location.state;
        await this.props.fetchArticle(id);
        const {title, text, picture} = this.props.article;
        this.setState({
            title,
            text,
            picture
        })
    }

    render(){
        const {title, text, picture} = this.state;
        const {history, errors} = this.props;

        history.listen(() => {
            removeError()
        });

        return (
            <div className="article-form">
                <form onSubmit={this.handleSubmit}>
                    <h1>Post a new article!</h1>
                    {(errors.message && <div className="error">{errors.message}</div>)}
                    <label htmlFor="title"></label>
                    <input 
                        className="input"
                        id="title"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                        value={title}
                        type="text"
                    />
                    <label htmlFor="text"></label>
                    <textarea 
                        className="input"
                        id="text"
                        name="text"
                        placeholder="Text"
                        onChange={this.handleChange}
                        value={text}
                        type="text"
                    ></textarea>
                    <label htmlFor="picture"></label>
                    <input 
                        className="input"
                        id="picture"
                        name="picture"
                        placeholder="Picture"
                        onChange={this.handleChange}
                        value={picture}
                        type="text"
                    />
                    <button type="submit" className="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors,
        article: state.articles.article
    }
}

export default connect(mapStateToProps, {fetchArticle, updateArticle, addError, removeError})(ArticleForm);