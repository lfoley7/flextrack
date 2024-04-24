import { useEffect, useState } from "react";
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from '../loading/Loading';
import './Dashboard.css';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/profile'
});

const getProfile = async (id) => {
    return await instance.get("get", { params: { id: id } });
}

const planInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/workout'
});

const getAllPlans = async (id) => {
    return await planInstance.get("get-all");
}

function Dashboard(props) {
    const [user, setUser] = useState();
    const [currentPlan, setCurrentPlan] = useState();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile(userId)
            .then((res) => {
                console.log(res.data)
                setUser(res.data);
                getAllPlans()
                .then((plan) => {
                    console.log(plan.data)
                    setCurrentPlan(plan.data[0]);
                    
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);


    if (user === undefined) {
        return (
            <>
                <Loading margin={0} minHeight={"1000px"} />
            </>
        );
    }

    return (
        <div className="display-container">
            <label className="view-workout-title">Welcome to Flextrack!</label>
            <button className="newDay darken text-align-center" style={{ width: "20rem" }} onClick={() => { 
                const today = new Date();
                let day = weekday[(today.getDay())]
                // TODO: this just grabs the first session right now, not dynamic based on date
                navigate("/viewworkout"+"/"+currentPlan.id+"/"+currentPlan.sessions[0].workout_type+"/"+currentPlan.sessions[0].day_of_week) }}>Jump to my next workout</button>
            <label className="view-workout-title">My Summary:</label>
            <div className="row mb-3">
                <div className="col" style={{ width: '20rem', height: '5rem' }}>
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <th>Deadlift</th>
                                <th>Squat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.deadlift} lbs</td>
                                <td>{user.squat} lbs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col" style={{ width: '20rem' }}>
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <th>OHP</th>
                                <th>Bench</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.ohp} lbs</td>
                                <td>{user.bench} lbs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;

