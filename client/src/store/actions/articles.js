import {apiCall} from '../../services/api';
import {addError, removeError} from './errors';
import {getUserActivity} from './user';
import {LOAD_ARTICLES, GET_ARTICLE} from '../actionTypes';

export const loadArticles = articles => ({
    type: LOAD_ARTICLES,
    articles
});

export const getArticle = article => ({
    type: GET_ARTICLE,
    article
});

export const fetchArticles = () => {
    return dispatch => {
        return apiCall("get", "/api/articles")
        .then(res => {
            dispatch(loadArticles(res))
        })
        .catch(err => dispatch(addError(err.message)));
    };
};

export const fetchArticle = (article_id) => {
    return dispatch => {
        return apiCall("get", `/api/articles/${article_id}`)
        .then(res => {
            dispatch(getArticle(res));
        })
        .catch(err => dispatch(addError("Article Not Found")));
    };
};

export const postNewArticle = (data) => (dispatch, getState) => {
    let {currentUser} = getState();
    const user_id = currentUser.user.id;
    return apiCall("post", `/api/users/${user_id}/articles`, data)
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
}

export const updateArticle = (data, article_id) => (dispatch, getState) => {
    let {currentUser} = getState();
    const user_id = currentUser.user.id;
    return apiCall("put", `/api/users/${user_id}/articles/${article_id}`, data)
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
}

export const removeArticle = (article_id) => (dispatch, getState) => {
    let {currentUser} = getState();
    const user_id = currentUser.user.id;
    return apiCall("delete", `/api/users/${user_id}/articles/${article_id}`)
        .then(async function(){
            return apiCall("get", `/api/user/${user_id}`)
            .then(activity => {
                dispatch(getUserActivity(activity));
                dispatch(removeError());
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
        })
        .catch(err => dispatch(addError(err.message)))
}
