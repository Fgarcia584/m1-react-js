import { Dispatch, PropsWithChildren, createContext, useEffect, useReducer } from "react";
import { AuthActionType, AuthReducer, AuthState, initialAuthState } from "../reducers/AuthReducer";

export interface Action<T> {
    type: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
}

export const AuthContext = createContext<
  [AuthState, Dispatch<Action<AuthActionType>>]
>([initialAuthState, () => null]);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) =>{
    const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

    useEffect(() => {
        const user = localStorage.getItem('@user')
        if (user) {
            dispatch({ type: AuthActionType.LOGIN, payload: JSON.parse(user) })
        }
    }, [])

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;