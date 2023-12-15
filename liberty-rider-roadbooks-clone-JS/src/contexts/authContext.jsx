import { Dispatch, PropsWithChildren, createContext, useEffect, useReducer } from "react";
import { LOGIN, AuthReducer, initialAuthState } from "../reducers/AuthReducer";

const defaultValueType = {
    state: initialAuthState,
    dispatch: () => null
}

export const AuthContext = createContext(defaultValueType)

const AuthProvider= ({ children }) =>{
    const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

    useEffect(() => {
        const user = localStorage.getItem('@user')
        if (user) {
            dispatch({ type: LOGIN, payload: JSON.parse(user) })
        }
    }, [])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;