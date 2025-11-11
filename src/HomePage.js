import React from 'react'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import SearchedProducts from './SearchedProducts';
import Products from './Products'
import { useState, useEffect } from 'react'
import { SearchIcon, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


function HomePage(props) {

    const { token, profile } = props
    const [cartCount, setCartCount] = useState(0)
    const [products, setProducts] = useState([])
    const [term, setTerm] = useState("")
    const [error, setError] = useState("")
    const [isOpen, setOpen] = useState(false)
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [searchedProductsPage, setSearchedProductsPage] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductPage, setSelectedProductPage] = useState(false);

    const navigate = useNavigate()

    const fetchProducts = () => {
        fetch("http://localhost:8080/api/products")
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    return res.json().then(data => {
                        setProducts(data)
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

    const fetchSearchedProducts = () => {
        fetch("http://localhost:8080/api/products/search?term=" + term)
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
    }

    function updateCart(productId) {

        if (!token) {
            navigate("/login")
            return
        }

        fetch("http://localhost:8080/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ "product_id": productId })
        })
            .then(res => {
                if (res.ok) {
                    setError("");

                    fetch("http://localhost:8080/api/cart", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                    })
                        .then(res => {
                            if (res.ok) {
                                return res.json()
                            }
                        })
                        .then((data) => {
                            let total = 0
                            for (let i = 0; i < data.length; i++) {
                                total += data[i].count
                            }
                            setCartCount(total)
                        })

                    return res.json();
                } else {
                    return res.text().then(text => {
                        setError(text);
                        console.error(text);
                    });
                }
            })
    }

    useEffect(() => {
        fetchProducts()
        if (token) {
            fetch("http://localhost:8080/api/cart", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then((data) => {
                    setCartCount(data.reduce((a, b) => a + b.count, 0))
                })
        }
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center gap-6 pt-2 sm:pt-4">
                <div className="absolute top-4 right-4">
                    <div className="relative">
                        <img
                            src={`http://localhost:8090/${profile.profile_picture ? profile.profile_picture : "default.jpg"}`}
                            alt="Profile"
                            className="border w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => setOpen(!isOpen)}
                        />
                        <div>{profile.name}</div>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 bg-gray-900 rounded-lg shadow-xl py-2 w-36 border">
                                <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/login")}>Login</div>
                                <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/register")}>Register</div>
                                {token && (
                                    <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/profile")}>Profile</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className='flex-1 flex items-center gap-2'>
                        <SearchIcon></SearchIcon>
                        <Input
                            onChange={(e) => setTerm(e.target.value)}
                            type="text"
                            placeholder="Search product"
                            className="flex-1 rounded-full text-xl px-4 py-2 bg-black text-gray-700 placeholder-gray-700"
                        />

                    </div>
                    <Button
                        onClick={() => { fetchSearchedProducts(); setSearchedProductsPage(true); }}
                        type="submit"
                        variant="outline"
                        className="w-full sm:w-auto px-4 py-2 text-sm bg-black text-gray-700 hover:bg-gray-700 rounded-full"
                    >
                        Search
                    </Button>
                    <div className="relative">
                        <ShoppingCart onClick={() => {
                            if (!token) {
                                navigate("/login")
                                return
                            } navigate("/cart")
                        }} className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.25 py-1.0 rounded-full">
                            {cartCount}
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-200 text-red-600 px-2 py-2 rounded-md">
                        {JSON.parse(error).info}
                    </div>
                )}

                <div className="mt-10">
                    <Products className="bg-black" setSearchedProductsPage={setSearchedProductsPage} setSearchedProducts={setSearchedProducts} searchedProducts={searchedProducts} searchedProductsPage={searchedProductsPage} setSelectedProductPage={setSelectedProductPage} setSelectedProduct={setSelectedProduct} selectedProductPage={selectedProductPage} selectedProduct={selectedProduct} products={products} updateCart={updateCart} />
                </div>
            </div>

        </>
    )
}

export default HomePage;