import React, { useState } from 'react';
import './Settings.css';

function Settings(props) {
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

    // Function to handle field changes
    const handleChange = (field, value) => {
        setUser(prev => ({ ...prev, [field]: value }));
    };

    // Function to toggle editing state
    const toggleEdit = (field) => {
        setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
    };

    function editableField(field) {
        return isEditing[field] ? (
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    value={user[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onBlur={() => toggleEdit(field)}
                    className="max-weight-input"
                    autoFocus
                />
            </div>
        ) : (
            <span onClick={() => toggleEdit(field)}>{user[field]} lbs</span>
        );
    }

    return (
        <div className="display-container mt-40 d-flex" style={{ paddingTop: '12rem' }}>
            <div className="row">
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="profile-image-container">
                        <img src="/profile.png" alt="Profile" className="profile-img mb-3" />
                    </div>
                    {isEditing.username ? (
                        <input
                            type="text"
                            value={user.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            onBlur={() => toggleEdit('username')}
                            className="username-input"
                            autoFocus
                        />
                    ) : (
                        <div className="username" onClick={() => toggleEdit('username')}>{user.username}</div>
                    )}
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="vr" style={{ height: '100%' }}></div>
                    <div className="right-content d-flex flex-column align-items-center">
                        <div className="row mb-3">
                            <div className="col" style={{ width: '20rem', height: '5rem' }}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Deadlift</th>
                                            <th>Squat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{editableField('deadlift')}</td>
                                            <td>{editableField('squat')}</td>
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
                                            <td>{editableField('ohp')}</td>
                                            <td>{editableField('bench')}</td>
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

export default Settings;
