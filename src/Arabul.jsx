import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import Cart from './Cart';
import Product from './Product';
import Register from './Register';
import Profile from './Profile';
import Login from './Login';
import Checkout from './Checkout';
import Orders from './Orders';
import Header from './Header';
import SearchedProducts from './SearchedProducts';

import { AppContext } from './AppContext';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { backendBaseUrl } from './env';

export const Arabul = () => {

  const [token, setToken] = useState("")
  const [isTokenCheckDone, setIsTokenCheckDone] = useState(false)
  const [profile, setProfile] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [error, setError] = useState("")
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [products, setProducts] = useState([])

  const fetchProducts = () => {
    fetch(`${backendBaseUrl}/api/products`)
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

  function updateCart(productId) {

    if (!token) {
      navigate("/login")
      return
    }

    fetch(`${backendBaseUrl}/api/cart`, {
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

          fetch(`${backendBaseUrl}/api/cart`, {
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

  const navigate = useNavigate()

  useEffect(() => {
    const t = localStorage.getItem("token")
    if (!t) {
      setIsTokenCheckDone(true)
      return
    }

    const token = jwtDecode(t)
    const promise2 = fetch(`${backendBaseUrl}/api/users/` + token.id, {
      headers: { "Authorization": t }
    })

    setToken(t.replace("Bearer ", ""))

    promise2.then(function (val) {
      val.json().then(function (a) {
        console.log(a)
        setProfile(a)
        setIsTokenCheckDone(true)
      })
    })
  }, [])

  function logOut() {
    localStorage.removeItem("token")
    setProfile(null)
    setToken("")
    return
  }

  const data = {
    setProfile,
    profile,
    setToken,
    token,
    setCartCount,
    cartCount,
    setError,
    error,
    setSearchedProducts,
    searchedProducts,
    fetchProducts,
    products,
    updateCart,
    logOut,
    navigate
  }

  if (!isTokenCheckDone) {
    return <div className='bg-gray-700'>Loading...</div>
  }
  return (
    <div>
      <AppContext.Provider value={data}>
        <Header />
        <Routes>
          <Route path='/home' element={<HomePage />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/register' element={<Register />} ></Route>
          <Route path='/product' element={<Product />} ></Route>
          <Route path='/cart' element={<Cart />} ></Route>
          <Route path='/order' element={<Checkout />} ></Route>
          <Route path='/orders' element={<Orders />} ></Route>
          <Route path='/profile' element={profile ? <Profile /> : <></>} ></Route>
          <Route path='/product/:id' element={<Product />} ></Route>
          <Route path='/product/searched/:term' element={<SearchedProducts />} ></Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
};