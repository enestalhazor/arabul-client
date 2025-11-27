import React, { useEffect, useState } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { AppContext, useContext } from "./AppContext"
import { HomeIcon, SearchIcon, ShoppingCart } from "lucide-react"
import { backendBaseUrl } from './env';

function Header() {

    const { token, profile, logOut, cartCount, setError, error, setCartCount } = useContext(AppContext)
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState(false)
    const [term, setTerm] = useState("")

    useEffect(() => {
        if (token) {
            fetch(`${backendBaseUrl}/api/cart`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then((data) => {
                    setCartCount(data.reduce((a, b) => a + b.count, 0))
                })
        }
        else {
            setCartCount(0)
        }
    }, [token])


    return (
        <div className="bg-gray-700 text-white flex items-center justify-between p-3 sm:p-2 gap-1">
            <Link to="/home">
                <HomeIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </Link>
            <div className="flex items-center bg-black rounded-full px-3 py-2 flex-1 min-w-[150px] max-w-[600px]">
                <SearchIcon className="w-5 h-5 text-gray-500" />
                <Input
                    onChange={(e) => setTerm(e.target.value)}
                    type="text"
                    placeholder="Search product"
                    className="bg-black border-none focus-visible:ring-0 placeholder-gray-700 text-gray-300 text-sm ml-2 w-full"
                />
                <Button
                    onClick={() => navigate(`/product/searched/${term}`)}
                    variant="outline"
                    className="ml-2 px-3 py-1 text-sm bg-black text-gray-300 hover:bg-gray-700 rounded-full"
                >
                    Search
                </Button>
                <div className="relative">
                    <ShoppingCart
                        onClick={() => (token ? navigate('/cart') : navigate('/login'))}
                        className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:text-gray-300"
                    />
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {cartCount}
                    </span>
                </div>
            </div>
            <div className="relative text-center flex flex-col items-center">
                <img
                    src={`http://localhost:8090/${profile?.profile_picture ?? "default.jpg"}`}
                    alt="Profile"
                    className="border w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setOpen(!isOpen)}
                />
                <div className="text-xs text-gray-200 sm:text-sm mt-1 truncate max-w-[90px]">{profile?.name ?? ""}</div>

                {isOpen && (
                    <div className="absolute top-12 right-0 bg-gray-900 rounded-lg shadow-xl py-2 w-36 border z-50">
                        <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/login')}>Login</div>
                        <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/register')}>Register</div>
                        {token && (
                            <>
                                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/profile')}>Profile</div>
                                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={logOut}>Logout</div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;
