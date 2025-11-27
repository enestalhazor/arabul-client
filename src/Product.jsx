import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext, useContext } from './AppContext';
import { backendBaseUrl } from './env';
import { ShoppingCart } from 'lucide-react';

function Product() {

    const { updateCart, token } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch(`${backendBaseUrl}/api/products/` + id, {
            headers: {
                "Authorization": "Bearer " + token
            },
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json().then(data => {
                        setProduct(data)
                    })
                }
                else {
                    res.text().then((text) => {
                        console.log(text)
                    })
                }
            })
    }, [])

    if (!product) {
        return (
            <div className="flex bg-gray-600 justify-center items-center h-screen text-white">
                Loading product...
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-700 px-4 py-10">
                <div className="flex flex-col md:flex-row items-center bg-gradient-to-br bg-black text-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden border border-gray-800">
                    <div className="md:w-1/2 w-full flex justify-center p-6 bg-black">
                        <img
                            src={`http://localhost:8090/${product.photo}`}
                            alt={product.name}
                            className="rounded-lg w-36 h-36 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="md:w-1/2 w-full p-6 space-y-4">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold mb-1">{product.name}</h1>
                            <p className="text-gray-400 text-sm leading-snug">{product.description}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wide">Category</p>
                            <p className="text-base font-medium text-gray-200">{product.category}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center justify-between w-full">
                                <div className="relative">
                                    <ShoppingCart
                                        onClick={() => { updateCart(product.id) }}
                                        className="w-4 h-4 text-white cursor-pointer hover:text-gray-300 transition"
                                    />
                                    <div className="absolute -top-3 -right-3  text-blue-500 text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        +
                                    </div>
                                </div>
                            </div>
                            <p className="text-blue-400 font-semibold text-lg">
                                £{product.price?.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;