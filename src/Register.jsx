import React, { useRef, useState } from 'react';
import { Button } from "./components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card"
import { Input } from "./components/ui/input"
import { useNavigate } from 'react-router-dom';

function Register(props) {

    const navigate = useNavigate()
    const inputFileRef = useRef(null)
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [profile_picture, setProfilePicture] = useState(null)

    const formData = new FormData();
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("password", password)
    formData.append("address", address)
    if (profile_picture !== null) {
        formData.append("profile_picture", profile_picture)
    }

    function handleRegister() {
        const promise = fetch("http://localhost:8080/api/users", {
            method: "POST",
            body: formData,
        })

        promise.then((res) => {
            if (res.status === 200) {
                setName("")
                setEmail("")
                setPassword("")
                setProfilePicture(null)
                setError("")
                navigate("/login")
                inputFileRef.current.value = null
            }
            else {
                res.text().then((text) => {
                    setError(text)
                })
            }
            console.log(res)
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b bg-gray-900 p-6">
            <div className="w-full max-w-md">
                <Card className="bg-black backdrop-blur-xl border border-gray-800 w-full h-full flex flex-col p-8 rounded-2xl shadow-2xl">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold text-gray-200 tracking-wide">
                            Register
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Welcome to <span className="text-blue-400 font-semibold">Arabul</span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col justify-center gap-4 mt-4">
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                            placeholder="Name"
                            className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
                        />
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            placeholder="Arabul@example.com"
                            className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
                        />
                        <Input
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            type="text"
                            placeholder="5xxxxxxxxx"
                            className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
                        />
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            placeholder="********"
                            className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
                        />
                        <Input
                            onChange={(e) => setAddress(e.target.value)}
                            id="address"
                            type="text"
                            placeholder="Istanbul / Uskudar"
                            className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
                        />
                        <Input id="picture" type="file" ref={inputFileRef} onChange={(event) => { setProfilePicture(event.target.files[0]); }} />
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 mt-6">
                        <Button
                            onClick={handleRegister}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-blue-500/20"
                        >
                            Register
                        </Button>

                        <div className="text-center text-gray-400 text-sm">
                            Already registered?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
                            >
                                Login here
                            </span>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>

    )
}

export default Register;