import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "./components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"

function Profile(props) {

    const { profile, token, setProfile } = props
    console.log(profile)
    const [isDisabled, setIsDisabled] = useState(true);
    const [name, setName] = useState(profile?.name || "")
    const [email, setEmail] = useState(profile?.email || "")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState(profile?.phone || "")
    const [address, setAddress] = useState(profile?.address || "")
    const [profilepicture, setProfilePic] = useState(profile?.profilepicture)

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
            <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
                <div className="w-full max-w-md flex justify-between items-center mb-6">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-gray-600 hover:text-black"
                    >
                    </Button>
                </div>
                <Card className="w-full max-w-md text-center shadow-lg rounded-2xl bg-black">
                    <CardHeader className="flex flex-col items-center gap-3">
                        <Avatar className="w-18 h-18 border-1 border-primary/20">
                            <AvatarImage src={`http://localhost:8090/${profile.profile_picture}`} />
                        </Avatar>
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <Label className="text-gray-600">Full Name</Label>
                                <Input disabled={isDisabled} onChange={(e) => { setName(e.target.value) }} value={name} className="text-lg font-semibold" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-600">Email</Label>
                                <Input disabled={isDisabled} onChange={(e) => { setEmail(e.target.value) }} value={email} className="text-gray-700" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-600">Phone</Label>
                                <Input disabled={isDisabled} onChange={(e) => { setPhone(e.target.value) }} value={phone} className="text-gray-700" />
                            </div>
                            <div className="space-y-1">
                                <Label disabled={isDisabled} className="text-gray-600">Password</Label>
                                <Input
                                    disabled={isDisabled}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type="password"
                                    value={password || ""}
                                    className="text-gray-700"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-600">Address</Label>
                                <Input disabled={isDisabled} onChange={(e) => { setAddress(e.target.value) }} value={address || "—"} className="text-gray-700" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        {isDisabled && (
                            <Button onClick={() => setIsDisabled(isDisabled => !isDisabled)} variant="default">Edit</Button>
                        )}
                        {!isDisabled && (
                            <Button onClick={() => { changeProfileInfos(); }} variant="default">Save</Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </>

    )
}

export default Profile;