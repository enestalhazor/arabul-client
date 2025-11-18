import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import Products from './Products'
import { useState, useEffect } from 'react'
import { SearchIcon, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppContext, useContext } from "./AppContext"


function HomePage() {

    const { token, setCartCount, setError, error, updateCart, setSearchedProducts, searchedProducts, searchedProductsPage, setSearchedProductsPage } = useContext(AppContext)

    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductPage, setSelectedProductPage] = useState(false);

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
        else {
            setCartCount(0)
        }
    }, [token])

    return (
        <>
            <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center gap-6 pt-2 sm:pt-4">
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