import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/profile'
});

const getProfile = async () => {
    return await instance.get("get");
}

function Navbar(props) {

    const navigate = useNavigate();

    const [user, setUser] = useState({username: "Username"});

    useEffect(() => {
        getProfile()
        .then((res) => {
            console.log(res.data)
            setUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
      }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "rgba(42,87,131,1)" }}>
            <div className="container-fluid">
                <a className="navbar-brand" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>FLEXTRACK</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/social')} style={{ cursor: 'pointer' }}>Social</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/posts')} style={{ cursor: 'pointer' }}>Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/challenges')} style={{ cursor: 'pointer' }}>Challenges</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>{user.username}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;