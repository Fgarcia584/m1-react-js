

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_LOADING = "SET_LOADING"
export const UPDATE_USER_INFOS = "UPDATE_USER_INFOS"


export const initialAuthState = {
    isLoggedIn: false,
    isloaded: false,
    userInfos: null
};

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                userInfos: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfos: initialAuthState.userInfos,
            };
        case UPDATE_USER_INFOS:
            return {
                ...state,
                userInfos: action.payload,
            };
        default:
            return state;
    }
};