import React, { useState, useEffect } from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card"
import { Button } from './components/ui/button';
import { useNavigate } from 'react-router-dom';

function Cart(props) {

    const { token } = props

    const [cart, setCart] = useState([])
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function getCart() {
        if (!token) {
            navigate("/login")
            return
        }

        fetch("http://localhost:8080/api/cart", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
        })
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    return res.json().then(data => {
                        setCart(data)
                    })
                }
                else {
                    res.text().then((text) => {
                        setError(text)
                        console.log(error)
                    })
                }
            })
    }

    function removeProduct(productId) {
        fetch("http://localhost:8080/api/cart/" + productId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            },
        })
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    getCart()
                }
                else {
                    res.text().then((text) => {
                        setError(text)
                        console.log(error)
                    })
                }
            })
    }


    useEffect(() => {
        getCart()
    }, [])

    const totalPrice = cart.reduce((sum, content) => sum + content.price * content.count, 0);
    const isEmpty = cart.length === 0

    return (
        <>
            <div className="min-h-screen relative bg-black text-white flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-black z-0"></div>
                <div className="relative z-10 w-[700px] max-w-full flex flex-col gap-4 p-6 bg-gray-800 rounded-lg shadow-xl">
                    {cart.length < 1 && (
                        <div className="w-full p-6 bg-gray-700 text-center rounded-lg text-gray-300 text-lg font-medium">
                            Your cart is empty.
                        </div>
                    )}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] pr-2">
                        {cart.map((content) => (
                            <Card
                                key={content.product_id}
                                className="w-full bg-gray-900 text-white rounded-xl shadow-md border border-gray-800 hover:shadow-blue-500/20 transition-all duration-300 p-4 flex items-start gap-4"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        src={`http://localhost:8090/${content.photo}`}
                                        alt={content.name}
                                        className="w-24 h-24 object-cover rounded-md border border-gray-700"
                                    />
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold truncate">{content.name}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">{content.description}</p>
                                        <p className="text-blue-400 font-medium mt-1">£{content.price.toFixed(2) * content.count}</p>
                                        <p className="text-gray-400 text-xs">Category: {content.category}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <button
                                            onClick={() => removeProduct(content.product_id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-600 text-xl font-bold transition-all"
                                            aria-label="Remove item"
                                        >
                                            –
                                        </button>
                                        <span className="text-white font-semibold">{content.count}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        <p className="text-blue-300 bg-gray-800 font-medium sticky bottom-0 right-0 w-full flex justify-end">Total = £{totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="sticky bottom-0 right-0 w-full flex justify-end mt-4">
                        <Button
                            onClick={() => navigate("/order")}
                            disabled={isEmpty}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                        >
                            Proceed to Payment
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;