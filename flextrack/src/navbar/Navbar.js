import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from "@fortawesome/free-brands-svg-icons"
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
    const location = useLocation();

    const isActive = (route) => {
        return location.pathname === route ? "nav-link active" : "nav-link";
    };

    const [user, setUser] = useState({ username: "Username" });

    useEffect(() => {
        getProfile()
            .then((res) => {
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
                            <a className={isActive('/createworkoutplan')} onClick={() => navigate('/createworkoutplan')} style={{ cursor: 'pointer' }}>My Workouts</a>
                        </li>
                        <li className="nav-item">
                            <a className={isActive('/social')} onClick={() => navigate('/social')} style={{ cursor: 'pointer' }}>Social</a>
                        </li>
                        <li className="nav-item">
                            <a className={isActive('/posts')} onClick={() => navigate('/posts')} style={{ cursor: 'pointer' }}>Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className={isActive('/challenges')} onClick={() => navigate('/challenges')} style={{ cursor: 'pointer' }}>Challenges</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: 'pointer', textDecoration: "none", color: "white" }}>
                                {user.username}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item nav-darken" style={{ cursor: "pointer", fontWeight: "500", color: "#f77a33", backgroundColor: "white" }} onClick={() => { navigate("/settings") }}><FontAwesomeIcon icon={faGear} />&nbsp;Settings</a></li>
                                <li><a className="dropdown-item nav-darken" href="https://github.com/cscopetski/CS542-Project" target="_blank" rel="noopener noreferrer" style={{ fontWeight: "500", color: "#f77a33", backgroundColor: "white" }}><FontAwesomeIcon icon={faGithub} />&nbsp;View the Repo</a></li>
                                <li><a className="dropdown-item nav-darken" style={{ cursor: "pointer", fontWeight: "500", color: "#f77a33", backgroundColor: "white" }} onClick={() => { navigate("/login") }}><FontAwesomeIcon icon={faSignOut} />&nbsp;Sign Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;