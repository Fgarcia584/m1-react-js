import { PropsWithChildren, useContext } from "react"
import LibertyLogo from "../assets/logo-with-text.png"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/authContext"


const Navbar: React.FC<PropsWithChildren> = () => {

  const [state] = useContext(AuthContext)

  console.log(state)


  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <img src={LibertyLogo} alt="roabooks-logo" style={{ height: 45 }} />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-zinc-950">
          <li>
            <Link to="/" className="text-zinc-950">GPS Moto</Link>
          </li>
          <li>
            <Link to="/" className="text-zinc-950">Roadbooks</Link>
          </li>
          <li>
            <Link to="/" className="text-zinc-950">SOS Accident</Link>
          </li>
          <li>
            <Link to="/" className="text-zinc-950">Premium offert</Link>
          </li>
        </ul>
        {state.isLoggedIn ? (
          <>
            <img className="w-8 rounded-full" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Dropdown</div>
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-44 mt-4">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>

          </>
        ) : (
          <li>
            <Link to="/auth" className="text-zinc-950">Connexion</Link>
          </li>
        )


        }


      </div>
    </div >
  )
}

export default Navbar