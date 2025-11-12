import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import Cart from './Cart';
import Product from './Product';
import Register from './Register';
import Profile from './Profile';
import Login from './Login';
import Checkout from './Checkout';
import Orders from './Orders';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export const Arabul = () => {

  const [token, setToken] = useState("")
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = localStorage.getItem("token")
    if (!t) {
      return
    }
    const token = jwtDecode(t)
    const promise2 = fetch("http://localhost:8080/api/users/" + token.id, {
      headers: { "Authorization": t }
    })

    setToken(t.replace("Bearer ", ""))

    promise2.then(function (val) {
      val.json().then(function (a) {
        console.log(a)
        setProfile(a)
      })
    })
  }, [])

  function logOut()
    {
        localStorage.removeItem("token")
        setProfile(null)
        setToken("")
        return
    }

  return (
    <Routes>
      <Route path='/home' element={<HomePage profile={profile} token={token} logOut={logOut} />} ></Route>
      <Route path='/login' element={<Login setToken={setToken} setProfile={setProfile} ></Login>} ></Route>
      <Route path='/register' element={<Register></Register>} ></Route>
      <Route path='/product' element={<Product></Product>} ></Route>
      <Route path='/cart' element={<Cart token={token}></Cart>} ></Route>
      <Route path='/order' element={<Checkout token={token}></Checkout>} ></Route>
      <Route path='/orders' element={<Orders profile={profile} token={token}></Orders>} ></Route>
      <Route path='/profile' element={profile ? <Profile profile={profile} token={token} setProfile={setProfile}></Profile> : <></>} ></Route>
      <Route path='/product/:id' element={<Product token={token}></Product>} ></Route>
    </Routes>
  );
};