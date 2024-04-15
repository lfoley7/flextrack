import React, { useState } from 'react';
import './Profile.css';

function Profile(props) {
    // Assuming there is only one user in the array for simplicity
    const [user, setUser] = useState({
        username: "John Do",
        deadlift: "300",
        squat: "250",
        ohp: "120",
        bench: "200",
        friend: "true"
    });
    const [isEditing, setIsEditing] = useState({
        username: false,
        deadlift: false,
        squat: false,
        ohp: false,
        bench: false
    });

    return (
        <div className="display-container mt-40 d-flex" style={{ paddingTop: '12rem' }}>
            <div className="row">
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="profile-image-container">
                        <img src="/profile.png" alt="Profile" className="profile-img mb-3" />
                    </div>
                    <div className="username">{user.username}</div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="vr" style={{ height: '100%' }}></div>
                    <div className="right-content d-flex flex-column align-items-center">
                        <div className="row mb-3">
                            <div className="col" style={{ width: '20rem' }}>
                                <table className="table">
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
                                <table className="table">
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
                        <button className="btn btn-primary login" style={{ width: '20rem' }}>Day 1 - Push</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
