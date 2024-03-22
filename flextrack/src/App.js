import { React, useState } from 'react';
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Navbar from './navbar/Navbar';
import Login from "./login/Login";
import Register from "./register/Register";
import Challenges from "./challenges/Challenges";
import CreateWorkout from "./createworkout/CreateWorkout";
import Settings from "./settings/Settings";
import Social from "./social/Social";
import './App.css';

export default function App() {

  let navbarElement

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [storeID, setStoreID] = useState("");

  const location = useLocation();
  useEffect(() => { }, [location]);

  return (
    <div>
      {location.pathname != "/login" && location.pathname != "/register" ? <Navbar signedIn={signedIn} /> : null}
      <Routes>
        <Route path='/' element={<Dashboard email={email} password={password} signedIn={signedIn} />} />
        <Route path='/login' element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} setSignedIn={setSignedIn} setStoreID={setStoreID} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/challenges' element={<Challenges />} />
        <Route path='/createworkout' element={<CreateWorkout />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/social' element={<Social />} />
      </Routes>
    </div>
  );
}