import { useContext } from "react";
import { signInWithGooglePopup } from "../../../../firebase"
import { AuthContext } from "../../../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "../../../reducers/AuthReducer";


const LoginForm = () => {
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate()
    const { state } = useLocation()

    const logGoogleUser = async () => {

        try {
            const response = await signInWithGooglePopup();
            
                if (response.user) {
                    dispatch({ type: LOGIN, payload: response.user })
                    localStorage.setItem('@user', JSON.stringify(response.user))
                    navigate(state?.from ? state.from : '/')
                }            
        }catch (error) {
            console.log("Error =>", error)
        }   
    }

    return (
        <div>
            <button className="btn btn-outline btn-primary" onClick={logGoogleUser}>S'insrire avec Google</button>
        </div>
    )
}

export default LoginForm
