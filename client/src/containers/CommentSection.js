import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postNewComment, editComment, removeComment} from '../store/actions/comments';
import Comment from '../components/Comment';

class CommentSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: "", 
            edit: false,
            comment_id: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEdit = (comment_id, comment_text) => {
        this.setState({
            comment: comment_text,
            edit: true,
            comment_id
        });
    }

    handleDelete = (comment_id) => {
        this.props.removeComment(comment_id);
    }

    handleSubmit = e => {
        e.preventDefault();
        if(!this.state.edit){
            this.props.postNewComment(this.state.comment);
            this.setState({
                comment: "",
                edit: false,
                comment_id: ""
            });
        } else {
            this.props.editComment(this.state.comment, this.state.comment_id);
            this.setState({
                comment: "",
                edit: false,
                comment_id: ""
            });
        };
    };

    render() {
        const {comment} = this.state;
        const {comments, currentUser} = this.props;
        let commentList = comments.map(c => (
            <Comment
                key={c._id}
                comment_id={c._id}
                date={c.createdAt}
                text={c.text}
                user={c.user.username}
                profileImage={c.user.profileImageUrl}
                admin={currentUser.user.isAdmin}
                remove={this.handleDelete.bind(this, c._id)}
                auth={(currentUser.user.id === c.user._id) ? true : false}
                edit={this.handleEdit.bind(this, c._id, c.text)}
            ></Comment>
        ))

        return (
            <div>
                <form className="comment-form" onSubmit={this.handleSubmit}>
                    <textarea 
                        id="comment"
                        name="comment"
                        placeholder="enter your comment"
                        onChange={this.handleChange}
                        value={comment}
                        type="text"
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
                <ul>{commentList}</ul>
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

export default connect(mapStateToProps, {postNewComment, editComment, removeComment})(CommentSection);