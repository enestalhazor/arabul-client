import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react'
import { ArrowLeft } from "lucide-react";

function Product(props) {

    const { product, updateCart, setSelectedProductPage } = props


    return (
        <>
            <button
                onClick={() => setSelectedProductPage(false)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-[-2px]"
            >
                <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium tracking-wide">Back</span>
            </button>
            <div className="flex flex-col lg:flex-row items-start justify-center p-6 lg:p-12 bg-black text-white rounded-2xl shadow-lg max-w-6xl mx-auto">
                <div className="flex-1 flex justify-center items-center mb-8 lg:mb-0">
                    <img
                        src={`http://localhost:8090/${product.photo}`}
                        alt={product.name}
                        className="rounded-2xl w-full max-w-md object-cover shadow-md"
                    />
                </div>
                <div className="flex-1 lg:pl-12 space-y-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-gray-400 text-sm">{product.description}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Category:</p>
                        <p className="text-lg font-medium">{product.category}</p>
                    </div>
                    <div className="relative inline-block">
                        <ShoppingCart
                            onClick={() => { updateCart(product.id) }}
                            className="w-4 h-4 text-white cursor-pointer hover:text-gray-300 transition"
                        />
                        <div className="absolute -top-3 -right-3  text-blue-500 text-xs font-bold px-1.5 py-0.5 rounded-full">
                            +
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Product;