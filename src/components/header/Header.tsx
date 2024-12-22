import { Link } from "react-router-dom"
import NavBar from "../navbar/NavBar"
import { useState } from "react"
import trackngologo from '../../assets/img/trackngo_logo.png'
import { useAuth } from "../../context/AuthContext"

const Header = () => {
    const [navOpen, setNavOpen] = useState<boolean>(false)
    const { logout, isAuthenticated } = useAuth()

    const toggleNav = () => setNavOpen(!navOpen)
    return (
        <div className="mx-0 mt-0 mb-20 p-0 pb-4">
            <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-950 to-zinc-950/75">
                <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
                    <Link className="p-0" to={"/"}>
                        <img className="p-0" src={trackngologo} width="150px" height="100px" alt="trackngo" />
                    </Link>

                    <div className="relative md:justify-self-center">
                        <button onClick={toggleNav} className="menu-btn md:hidden">
                            <div className="material-symbols-rounded">
                                {navOpen ? 'close' : 'menu'}
                            </div>
                        </button>
                        <NavBar navOpen={navOpen} />
                    </div>

                    {isAuthenticated ? (
                        <Link
                            to="/"
                            onClick={logout}
                            className="max-w-max h-10 flex items-center gap-2 px-4 rounded-xl font-medium text-sm ring-1 ring-zinc-500 ring-inset transition-[background-color] text-white bg-zinc-800 active:bg-zinc-700 capitalize hover:bg-red-600 max-md:hidden md:justify-self-end"
                        >
                            Logout
                        </Link>

                    ) : (
                        <Link to="/login" className="btn1 btn1-secondary max-md:hidden md:justify-self-end">
                            Login
                        </Link>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Header