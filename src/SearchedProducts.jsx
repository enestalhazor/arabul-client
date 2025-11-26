import React, { useContext, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card"
import { ShoppingCart } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from './AppContext';



function SearchedProducts(props) {

    const { updateCart, searchedProducts, setSearchedProducts, error, setError } = useContext(AppContext)
    const navigate = useNavigate()
    const { term } = useParams()

    useEffect(() => {
        fetch(`${backendBaseUrl}/api/products/search?term=` + term)
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    return res.json().then(data => {
                        setSearchedProducts(data)
                    })
                }
                else {
                    res.text().then((text) => {
                        setError(text)
                        console.log(error)
                    })
                }
            })

    }, [term])

    return (
        <>
            <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center gap-6 pt-2 sm:pt-4">
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 p-4">
                    {searchedProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="w-55 max-w-xs bg-black text-white rounded-2xl shadow-md hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden"
                        >
                            <CardHeader className="pb-2 px-3 pt-3">
                                <CardTitle className="text-md font-semibold truncate">{product.name}</CardTitle>
                                <CardDescription className="text-gray-400 text-sm line-clamp-2">{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 pt-1">
                                <img
                                    onClick={() => { navigate("/product/" + product.id) }}
                                    src={`http://localhost:8090/${product.photo}`}
                                    alt={product.name}
                                    className="w-30 h-30 object-cover rounded-lg mb-2"
                                />
                                <p className="text-gray-400 text-xs">Category: {product.category}</p>
                            </CardContent>
                            <CardFooter className="px-4 pb-3 pt-1">
                                <div className="flex items-center justify-between w-full">
                                    <div className="relative inline-block">
                                        <ShoppingCart
                                            onClick={() => { updateCart(product.id) }}
                                            className="w-4 h-4 text-white cursor-pointer hover:text-gray-300 transition"
                                        />
                                        <div className="absolute -top-3 -right-3  text-blue-500 text-xs font-bold px-1.5 py-0.5 rounded-full">
                                            +
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-blue-400">£{product.price.toFixed(2)}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SearchedProducts;