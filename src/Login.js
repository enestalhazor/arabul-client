import React, { useState } from 'react';
import { Button } from "./components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card"
import { Input } from "./components/ui/input"
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    // idle, loading, success, fail

    const {
        setToken,
        setProfile,
    } = props

    function handleSubmit() {
        const promise = fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
            headers: { "Content-Type": "application/json" }
        })

        promise.then(function (val) {
            if (val.status === 200) {

                val.json().then(function (a) {
                    setToken(a.token)
                    const token = a.token
                    const decodedToken = jwtDecode(token)
                    const id = decodedToken.id

                    const promise2 = fetch("http://localhost:8080/api/users/" + id, {
                        headers: { "Authorization": "Bearer " + a.token }
                    })

                    promise2.then(function (val) {
                        val.json().then(function (a) {
                            console.log(a)
                            setProfile(a)
                            navigate("/home")
                            setError("")
                            localStorage.setItem("token", "Bearer " + token)
                        })
                    })
                })
            }
            else {
                val.text().then((text) => {
                    setError(text)
                    console.log(text)
                })
            }
        })
    }

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b bg-gray-900 p-6">
                <div className="w-full max-w-md">
                    <Card className="bg-black backdrop-blur-xl border border-gray-800 w-full flex flex-col p-8 rounded-2xl shadow-2xl">
                        <CardHeader className="text-center space-y-2">
                            <CardTitle className="text-2xl font-bold text-white tracking-wide">
                                Login to Your Account
                            </CardTitle>
                            <CardDescription className="text-gray-400 text-sm">
                                Welcome back to <span className="text-blue-400 font-semibold">Arabul</span>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-col justify-center gap-4 mt-6">
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                placeholder="arabul@example.com"
                                className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                            />
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                placeholder="********"
                                className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 mt-6">
                            <Button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-blue-500/20"
                            >
                                Login
                            </Button>

                            <div className="text-center text-gray-400 text-sm">
                                Don’t have an account?{" "}
                                <span
                                    onClick={() => navigate("/register")}
                                    className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
                                >
                                    Register here
                                </span>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </>
    )
}

export default Login;