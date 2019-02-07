import {LOAD_ARTICLES, GET_ARTICLE} from '../actionTypes';

const DEFAULT_STATE = {
    articles: [],
    article: {}
}

export default (state=DEFAULT_STATE, action) => {
    switch(action.type){
        case LOAD_ARTICLES:
            return {articles: action.articles, article: {...state.article}};
        case GET_ARTICLE:
            return {articles: [...state.articles], article: action.article}; 
        default:
            return state; 
    }
};