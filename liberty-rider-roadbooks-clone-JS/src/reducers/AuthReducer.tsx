
export interface User {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    isloaded: boolean;
    userInfos: User | undefined;
}

export enum AuthActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    SET_USER = "SET_USER",
}

export interface AuthAction {
    type: AuthActionType;
    payload?: User;
}

export const initialAuthState: AuthState = {
    isLoggedIn: false,
    isloaded: false,
    userInfos: {
        firstname: "",
        lastname: "",
        password: "",
        email: "",
    
    },
};

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case AuthActionType.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        case AuthActionType.SET_USER:
            return {
                ...state,
                userInfos: action.payload,
            };
        default:
            return state;
    }
};