import { useEffect } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Settings.css';

function Settings(props) {
    const navigate = useNavigate();

    return (
        <div className="display-container">
            Welcome to the Settings Page!
            <a onClick={() => { navigate("/"); }}>Dashboard Page!</a>
            <a onClick={() => { navigate("/createWorkout"); }}>Create Workout Page!</a>
            <a onClick={() => { navigate("/social"); }}>Social Page!</a>
            <a onClick={() => { navigate("/challenges"); }}>Challenges Page!</a>
            <a onClick={() => { navigate("/settings"); }}>Settings Page!</a>
        </div>
    )
};

export default Settings;