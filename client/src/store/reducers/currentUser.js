import {SET_CURRENT_USER, GET_USER_ACTIVITY} from '../actionTypes';

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    activity: {}
}

export default (state=DEFAULT_STATE, action) => {
    switch(action.type){
        case SET_CURRENT_USER: 
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user,
                activity: {}
            };
        case GET_USER_ACTIVITY:
            return {
                isAuthenticated: state.isAuthenticated,
                user: {...state.user},
                activity: action.activity
            }
        default:
            return state;
    }
};