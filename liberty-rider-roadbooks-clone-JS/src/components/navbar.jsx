import { useContext } from "react"
import LibertyLogo from "../assets/logo-with-text.png"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/authContext"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { LOGOUT } from "../reducers/AuthReducer"


const Navbar = () => {

  const { state, dispatch } = useContext(AuthContext)
  const photoUrl = state.userInfos?.photoURL
  const userName = state.userInfos?.displayName.split(' ')[0]

  const onLogout = async () => {
    await signOut(auth)
      .then(() => {
        localStorage.removeItem('@user')
        dispatch({ type: LOGOUT })
      })
      .catch(error => console.log('SignOut error ->', error))
  }

  return (
    <div className="navbar bg-base-100 px-4 py-0">
      <div className="flex-1">
        <Link to="/" ><img src={LibertyLogo} alt="roabooks-logo" style={{ height: 45 }} /></Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-zinc-950">
          <li>
            <div className="text-zinc-950">GPS Moto</div>
          </li>
          <li>
            <Link to={"/"} className="text-zinc-950" >Roadbooks</Link>
          </li>
          <li>
            <div className="text-zinc-950">SOS Accident</div>
          </li>
          <li>
            <div className="text-zinc-950">Premium offert</div>
          </li>
        </ul>
        {state.isLoggedIn ? (
          <>
            <img className="w-8 rounded-full" src={photoUrl} />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">{userName}</div>
              <ul tabIndex={0} className="menu dropdown-content z-[1] shadow bg-base-100 rounded-box w-44 mt-4">
                <li><Link to="/" className="text-zinc-950">Mes itinéraires et roadbooks</Link></li>
                <li><button onClick={onLogout}>Déconnexion</button></li>
              </ul>
            </div>

          </>
        ) : (
          <li className="list-none">
            <Link to="/auth" className="text-zinc-950 btn btn-outline btn-primary rounded-full">Connexion</Link>
          </li>
        )


        }


      </div>
    </div >
  )
}

export default Navbar