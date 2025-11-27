import React, { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { useNavigate } from "react-router-dom"
import { AppContext, useContext } from "./AppContext"
import { backendBaseUrl } from "./env"


function Checkout() {

    const { token, setCartCount } = useContext(AppContext)
    const [CreditCardNumber, setCreditCardNumber] = useState("")
    const [VerificationCode, setVerificationCode] = useState("")
    const [ExpirationDate, setExpirationDate] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const navigate = useNavigate()

    function checkoutOrder() {

        fetch(`${backendBaseUrl}/api/cart`, {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((cartProducts) => {
                const result = cartProducts.map((p) => ({
                    product_id: p.product_id,
                    count: p.count
                }));

                const queryParams = new URLSearchParams({
                    creditCardNumber: CreditCardNumber,
                    verificationCode: VerificationCode,
                    expirationDate: ExpirationDate,
                    firstName: FirstName,
                    lastName: LastName
                }).toString();

                const promise = fetch(`${backendBaseUrl}/api/order?${queryParams}`, {
                    method: "POST",
                    body: JSON.stringify(result),
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token }
                })

                promise.then((res) => {
                    if (res.status === 200) {
                        fetch(`${backendBaseUrl}/api/cart`, {
                            method: "DELETE",
                            headers: { "Authorization": "Bearer " + token }
                        })
                        setCartCount(0)
                        navigate("/orders")
                    }
                })

            })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 px-4 py-10">
                <Card className="w-full max-w-md bg-gray-950 text-gray-100 shadow-2xl rounded-3xl border border-gray-800">
                    <CardHeader className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold text-white">Checkout</h2>
                        <p className="text-gray-400 text-sm">Enter your payment details below</p>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div>
                            <Label className="text-gray-400 mb-1 block text-left">Credit Card Number</Label>
                            <Input
                                placeholder="5555-5555-5555-5555"
                                value={CreditCardNumber}
                                onChange={(e) => setCreditCardNumber(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-gray-400 mb-1 block text-left">Verification Code</Label>
                                <Input
                                    placeholder="555"
                                    value={VerificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-400 mb-1 block text-left">Expiration Date</Label>
                                <Input
                                    placeholder="05/30"
                                    value={ExpirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-gray-400 mb-1 block text-left">First Name</Label>
                                <Input
                                    placeholder="Arabul"
                                    value={FirstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-400 mb-1 block text-left">Last Name</Label>
                                <Input
                                    placeholder="Admin"
                                    value={LastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center pt-6">
                        <Button
                            onClick={checkoutOrder}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-2"
                        >
                            Confirm Order
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Checkout;
