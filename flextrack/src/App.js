import { React, useState } from 'react';
import { useEffect } from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Navbar from './navbar/Navbar';
import Login from "./login/Login";
import Register from "./register/Register";
import Challenges from "./challenges/Challenges";
import CreateWorkout from "./createworkout/CreateWorkout";
import Settings from "./settings/Settings";
import Social from "./social/Social";
import Posts from "./posts/Posts";
import Profile from "./profile/Profile";
import ViewWorkout from "./viewworkout/ViewWorkout";
import './App.css';
import WebFont from 'webfontloader';

export default function App() {
  WebFont.load({
    google: {
      families: ['Poppins:400,600,700']
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  const location = useLocation();
  useEffect(() => { }, [location]);
  useEffect(() => {
    if (['/login', '/register'].includes(location.pathname)) {
      document.body.classList.remove('custom-background');
    } else {
      document.body.classList.add('custom-background');
    }
  }, [location]);

  return (
    <div>
      {location.pathname != "/login" && location.pathname != "/register" ? <Navbar signedIn={signedIn} /> : null}
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path='/dashboard' element={<Dashboard email={email} password={password} signedIn={signedIn} />} />
        <Route path='/login' element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} setSignedIn={setSignedIn} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/challenges' element={<Challenges />} />
        <Route path='/createworkout' element={<CreateWorkout />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/social' element={<Social />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/profile'>
          <Route path=":userId" element={<Profile />} />
        </Route>
        <Route path='/viewworkout' element={<ViewWorkout />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}