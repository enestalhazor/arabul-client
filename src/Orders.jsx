import React from 'react'
import { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "./components/ui/card"
import { useNavigate } from 'react-router-dom';
import { AppContext, useContext } from './AppContext';


function Orders(props) {

    const { token, profile } = useContext(AppContext)
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            fetch(`${backendBaseUrl}/api/order`, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json().then(data => {

                            setOrders(data.slice().reverse())
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
        <div className="min-h-screen bg-gray-700 text-white p-6 flex flex-col items-center gap-6">
            <h1 className='text-2xl'>My orders</h1>
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
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        <span className="text-blue-400">Order #{order.order_id}</span>{" "}
                                    </h3>
                                    <h4>
                                        <span className="text-gray-500">{new Date(order.order_date).toLocaleString()}</span>{" "}
                                    </h4>
                                </div>
                                <p className="text-gray-200 text-sm">
                                    Credit Card: **** **** **** {order.credit_card_number.slice(-4)}
                                </p>
                                <p className="text-gray-500 text-sm">   
                                    Shipping to {profile.address}
                                </p>
                            </CardHeader>
                            <CardContent className="bg-c p-4 flex flex-col gap-4">
                                {order.products.map(product => (
                                    <div onClick={() => {navigate("/product/" + product.product_id)}} key={product.product_id} className="flex gap-4 items-center bg-gray-900 p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition">
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