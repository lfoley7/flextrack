import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
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
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile(userId)
            .then((res) => {
                setUser(res.data);
                getAllPlans()
                    .then((plan) => {
                        setCurrentPlan(plan.data[0]);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId]);

    const onHandleNextWorkout = () => {
        try {
            if (currentPlan && currentPlan.sessions.length > 0) {
                navigate("/viewworkout/" + currentPlan.id + "/" + currentPlan.sessions[0].workout_type + "/" + currentPlan.sessions[0].day_of_week);
            } else {
                throw new Error("You don't have any workouts yet. Try creating a workout plan on the \"My Workouts\" page first!");
            }
        } catch (err) {
            setErrorMessage(err.message);
            setShowErrorModal(true);
        }
    }

    const handleCloseErrorModal = () => setShowErrorModal(false);

    if (user === undefined) {
        return <Loading margin={0} minHeight={"1000px"} />;
    }

    return (
        <div className="display-container">
            <label className="view-workout-title">Welcome to Flextrack!</label>
            <button className="newDay darken text-align-center" style={{ width: "20rem" }} onClick={onHandleNextWorkout}>Jump to my next workout</button>
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
            <Modal className="posts-modal" show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header className="posts-modal-header" closeButton>
                    <Modal.Title className="posts-modal-text">Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>You don't have any workouts yet. Try creating a workout plan on the <a className="orange-link" onClick={() => { navigate("/createworkoutplan"); }}>My Workouts</a> page first!</Modal.Body>
                <Modal.Footer>
                    <Button className="posts-modal-button darken" onClick={handleCloseErrorModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;