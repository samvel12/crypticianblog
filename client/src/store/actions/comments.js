import {apiCall} from '../../services/api';
import {addError} from './errors';
import {fetchArticle} from './articles';

export const postNewComment = (comment) => (dispatch, getState) => {
    let {currentUser, articles} = getState();
    const user_id = currentUser.user.id;
    const article_id = articles.article._id;
    return apiCall("post", `/api/users/${user_id}/comments/${article_id}`, {text: comment})
        .then(res => dispatch(fetchArticle(article_id)))
        .catch(err => dispatch(addError(err.message)));
}

export const editComment = (newComment, comment_id) => (dispatch, getState)  => {
    let {currentUser, articles} = getState();
    const user_id = currentUser.user.id;
    const article_id = articles.article._id;
    return apiCall("put", `/api/users/${user_id}/comments/${article_id}/${comment_id}`, {text: newComment})
    .then(res=> dispatch(fetchArticle(article_id))) 
    .catch(err => dispatch(addError(err.message)));
}

export const removeComment = (comment_id) => (dispatch, getState) => {
    let {currentUser, articles} = getState();
    const user_id = currentUser.user.id;
    const article_id = articles.article._id;
    return apiCall("delete", `/api/users/${user_id}/comments/${article_id}/${comment_id}`)
    .then(res=> dispatch(fetchArticle(article_id))) 
    .catch(err => dispatch(addError(err.message)));
}