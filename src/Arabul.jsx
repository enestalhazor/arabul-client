import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import Cart from './Cart';
import Product from './Product';
import Register from './Register';
import Profile from './Profile';
import Login from './Login';
import { Home } from 'lucide-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export const Arabul = (props) => {

  const [token, setToken] = useState("")
  const [profile, setProfile] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const t = localStorage.getItem("token")
    if (!t) {
      return
    }
    const token = jwtDecode(t)
    if (t) {
      const promise2 = fetch("http://localhost:8080/api/users/" + token.id, {
        headers: { "Authorization": t }
      })

      promise2.then(function (val) {
        val.json().then(function (a) {
          console.log(a)
          setProfile(a)
          navigate("/home")
        })
      })
      navigate("/home")
    }
  }, [])

  return (
    <Routes>
      <Route path='/home' element={<HomePage profile={profile} token={token} />} ></Route>
      <Route path='/login' element={<Login setToken={setToken} setProfile={setProfile} ></Login>} ></Route>
      <Route path='/register' element={<Register></Register>} ></Route>
      <Route path='/product' element={<Product></Product>} ></Route>
      <Route path='/cart' element={<Cart></Cart>} ></Route>
      <Route path='/profile' element={<Profile></Profile>} ></Route>
    </Routes>
  );
};