import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "./components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { useNavigate } from "react-router-dom"
import { AppContext, useContext } from "./AppContext"

function Profile(props) {

    const { profile, token, setProfile } = useContext(AppContext)
    
    const [isDisabled, setIsDisabled] = useState(true)
    const [name, setName] = useState(profile?.name || "")
    const [email, setEmail] = useState(profile?.email || "")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState(profile?.phone || "")
    const [address, setAddress] = useState(profile?.address || "")
    const [profilepicture, setProfilePic] = useState(profile?.profilepicture)

    const navigate = useNavigate()

    function changeProfileInfos() {
        const formData = new FormData()
        if (profile.name !== name) {
            formData.append("name", name)
        }
        if (profile.email !== email) {
            formData.append("email", email)
        }
        if (password) {
            formData.append("password", password)
        }
        if (profile.phone !== phone) {
            formData.append("phone", phone)
        }
        if (profile.address !== address) {
            formData.append("address", address)
        }

        const promise = fetch("http://localhost:8080/api/users/" + profile.id, {
            method: "PUT",
            body: formData,
            headers: { "Authorization": "Bearer " + token }
        })

        promise.then((res) => {
            if (res.status !== 200) {
                res.text().then((text) => {
                })
            }
            setIsDisabled(a => !a)
            const promise2 = fetch("http://localhost:8080/api/users/" + profile.id, {
                headers: { "Authorization": "Bearer " + token }
            })

            promise2.then(function (val) {
                val.json().then(function (a) {
                    console.log(a)
                    setProfile(a)
                })
            })
        })

    }

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-950 p-6">
                <Card className="w-full max-w-md shadow-lg rounded-2xl bg-black">
                    <CardHeader className="flex flex-col items-center gap-4 pt-6">
                        <Avatar className="w-20 h-20 border border-primary/20">
                            <AvatarImage src={`http://localhost:8090/${profile.profile_picture}`} />
                        </Avatar>
                        <h3>{profile.name}</h3>
                        <div className="w-full space-y-4">
                            <div className="space-y-1">
                                <Label className="text-gray-400">Full Name</Label>
                                <Input
                                    disabled={isDisabled}
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="text-lg font-semibold text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400">Email</Label>
                                <Input
                                    disabled={isDisabled}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400">Phone</Label>
                                <Input
                                    disabled={isDisabled}
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    className="text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400">Password</Label>
                                <Input
                                    disabled={isDisabled}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    value={password || ""}
                                    className="text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400">Address</Label>
                                <Input
                                    disabled={isDisabled}
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address || "—"}
                                    className="text-gray-200 placeholder-gray-500"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex justify-center gap-4 mt-6 pb-6">
                        {isDisabled ? (
                            <Button onClick={() => setIsDisabled(false)} variant="default">
                                Edit
                            </Button>
                        ) : (
                            <Button onClick={changeProfileInfos} variant="default">
                                Save
                            </Button>
                        )}
                        <Button className="bg-blue-800" onClick={() => { navigate("/orders") }}>My Orders</Button>
                    </CardFooter>
                </Card>
            </div>
        </>

    )
}

export default Profile;