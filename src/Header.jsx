import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { AppContext, useContext } from "./AppContext"
import { HomeIcon, SearchIcon, ShoppingCart } from "lucide-react"

function Header(props) {

    const { token, profile, logOut, cartCount, setError, error, setCartCount } = useContext(AppContext)
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState(false)
    const [term, setTerm] = useState("")


    useEffect(() => {
        if (token) {
            fetch("http://localhost:8080/api/cart", {
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
        <div>
            <div className="bg-gray-950 relative text-white flex flex-col items-center gap-6 pt-2 sm:pt-4">
                <div className="absolute top-4 left-4">
                    <Link to={"/home"}>
                        <HomeIcon className="left-4"></HomeIcon>
                    </Link>
                </div>
                <div className="absolute top-4 right-4">
                    <div className="relative">
                        <img
                            src={`http://localhost:8090/${(profile && profile.profile_picture) ? profile.profile_picture : "default.jpg"}`}
                            alt="Profile"
                            className="border w-10 h-10 rounded-full cursor-pointer"
                            onClick={() =>  setOpen((isOpen) => (!isOpen))}
                        />
                        <div>{(profile && profile.name) ? profile.name : ""}</div>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 bg-gray-900 rounded-lg shadow-xl py-2 w-36 border">
                                <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/login")}>Login</div>
                                <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/register")}>Register</div>
                                {token && (
                                    <>
                                        <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/profile")}>Profile</div>
                                        <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={() => logOut()}>Logout</div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className='flex-1 flex items-center gap-2'>
                        <SearchIcon />
                        <Input
                            onChange={(e) => setTerm(e.target.value)}
                            type="text"
                            placeholder="Search product"
                            className="flex-1 rounded-full text-xl px-4 py-2 bg-black text-gray-700 placeholder-gray-700"
                        />
                    </div>
                    <Button
                        onClick={() => { navigate("/product/searched/" + term) }}
                        type="submit"
                        variant="outline"
                        className="w-full sm:w-auto px-4 py-2 text-sm bg-black text-gray-700 hover:bg-gray-700 rounded-full"
                    >
                        Search
                    </Button>
                    <div className="relative">
                        <ShoppingCart onClick={() => {
                            if (!token) {
                                navigate("/login")
                                return
                            } navigate("/cart")
                        }} className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.25 py-1.0 rounded-full">
                            {cartCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
