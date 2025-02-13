import axios from 'axios';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
});

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

const logoutFailure = (error) => ({
    type: LOGOUT_FAILURE,
    payload: error,
});

export const logout = () => async (dispatch) => {
    dispatch(logoutRequest());
    try {
        // Make sure EXPO_PUBLIC_IP_ADDRESS is defined in your .env or environment variables
        const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/users/logout/`); // Use POST

        if (response.status === 200) { // Check for successful logout
            dispatch(logoutSuccess());
            // Optionally, clear user data from local storage or AsyncStorage here
            // Example: await AsyncStorage.removeItem('authToken');
        } else {
            dispatch(logoutFailure("Logout failed"));
        }
    } catch (error) {
        dispatch(logoutFailure(error.message || "Logout failed"));
    }
};