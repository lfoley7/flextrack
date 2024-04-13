import { useEffect } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Dashboard.css';

function Dashboard(props) {
    const navigate = useNavigate();

    return (
        <div className="display-container">
            <div className="top-message">
                Welcome to the Dashboard!
            </div>
            <a className="orange-link" onClick={() => { navigate("/"); }}>Dashboard Page!</a>
            <a className="orange-link" onClick={() => { navigate("/createWorkout"); }}>Create Workout Page!</a>
            <a className="orange-link" onClick={() => { navigate("/viewWorkout"); }}>View Workout Page!</a>
            <a className="orange-link" onClick={() => { navigate("/social"); }}>Social Page!</a>
            <a className="orange-link" onClick={() => { navigate("/challenges"); }}>Challenges Page!</a>
            <a className="orange-link" onClick={() => { navigate("/settings"); }}>Settings Page!</a>
            Your Routine:
        </div>
    )
};

export default Dashboard;