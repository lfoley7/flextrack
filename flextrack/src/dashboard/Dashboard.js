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

function Dashboard(props) {
    const [user, setUser] = useState();
    let { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile(userId)
            .then((res) => {
                console.log(res.data)
                setUser(res.data);
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
            <button className="newDay darken text-align-center" style={{ width: "20rem" }} onClick={() => { navigate("/viewworkout") }}>Jump to my next workout</button>
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

