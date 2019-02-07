import {apiCall} from '../../services/api';
import {GET_USER_ACTIVITY} from '../actionTypes';
import {addError, removeError} from './errors';

export function getUserActivity(activity){
    return {
        type: GET_USER_ACTIVITY,
        activity
    };
};

export function getActivity(user_id){
    return dispatch => {
        return apiCall("get", `/api/user/${user_id}`)
            .then(activity => {
                dispatch(getUserActivity(activity));
                dispatch(removeError());
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    };
};