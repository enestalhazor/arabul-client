import Products from './Products'
import { useState, useEffect } from 'react'
import { AppContext, useContext } from "./AppContext"
import { backendBaseUrl } from "./env"

function HomePage() {

    const { error, fetchProducts } = useContext(AppContext)

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center gap-6 pt-2 sm:pt-4">
                {error && (
                    <div className="bg-red-200 text-red-600 px-2 py-2 rounded-md">
                        {JSON.parse(error).info}
                    </div>
                )}
                <div className="mt-10">
                    <Products className="bg-black"/>
                </div>
            </div>

        </>
    )
}

export default HomePage;