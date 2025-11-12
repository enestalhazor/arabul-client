import React from 'react'
import { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "./components/ui/card"


function Orders(props) {

    const { token } = props
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (token) {
            fetch("http://localhost:8080/api/order", {
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json().then(data => {
                            setOrders(data)
                        })
                    }
                    else {
                        res.text().then((text) => {
                            console.log(text)
                        })
                    }
                })
        }
    }, [token])

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center gap-6">
            {orders.length === 0 ? (
                <p className="text-gray-400 text-lg">You have no orders yet.</p>
            ) : (
                orders.map(order => {

                    const totalPrice = order.products.reduce(
                        (sum, p) => sum + p.price * p.count,
                        0
                    );

                    return (
                        <Card className="w-full max-w-3xl bg-black shadow-lg rounded-xl overflow-hidden">
                            <CardHeader className="bg-black p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">
                                        <span className="text-blue-400">Order #{order.order_id}</span>{" "}
                                        <span className="text-white">{order.first_name} {order.last_name}</span>
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Credit Card: **** **** **** {order.credit_card_number.slice(-4)}
                                </p>
                            </CardHeader>
                            <CardContent className="bg-c p-4 flex flex-col gap-4">
                                {order.products.map(product => (
                                    <div key={product.product_id} className="flex gap-4 items-center bg-gray-900 p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition">
                                        <img
                                            src={`http://localhost:8090/${product.photo}`}
                                            alt={product.name}
                                            className="w-20 h-20 object-cover rounded-md border border-gray-600"
                                        />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <h4 className="font-semibold text-white">{product.name}</h4>
                                            <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                                            <p className="text-blue-400 font-medium mt-1">£{(product.price * product.count).toFixed(2)}</p>
                                            <p className="text-gray-400 text-xs">Category: {product.category} | Count: {product.count}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="bg-black p-4 flex justify-between items-center">
                                <span className="text-blue-300 font-semibold">Total: £{totalPrice.toFixed(2)}</span>
                            </CardFooter>
                        </Card>
                    );
                })
            )}
        </div>
    )
}

export default Orders;