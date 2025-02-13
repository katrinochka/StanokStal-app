import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './authActions';

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false, // Reset auth state
                loading: false,
                error: null,
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;