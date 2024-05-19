import React, { useState, useEffect } from 'react';
import { workoutInstance, profileInstance } from '../api/axiosInstances';
import './Settings.css';
import Loading from '../loading/Loading';

const getWorkoutPlans = async () => {
    return await workoutInstance.get("get-all");
}

function Settings(props) {
    const [user, setUser] = useState();
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [editValues, setEditValues] = useState({});
    const [isEditing, setIsEditing] = useState({
        username: false,
        height: false,
        weight: false,
        description: false,
        deadlift: false,
        squat: false,
        ohp: false,
        bench: false
    });

    // Function to handle field changes
    const handleChange = (field, value) => {
        setEditValues(prev => ({ ...prev, [field]: value }));
    };

    // Function to toggle editing state
    const toggleEdit = (field) => {
        setIsEditing(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
        if (!isEditing[field]) {
            setEditValues(prev => ({ ...prev, [field]: '' }));
        } else {
            const newValue = editValues[field] !== '' ? editValues[field] : user[field];
            setUser(prev => ({ ...prev, [field]: newValue }));
        }
    };

    const getProfile = async () => {
        return await profileInstance.get("get");
    };

    const updateProfile = async () => {
        return await profileInstance.post("update", user);
    };

    useEffect(() => {
        getProfile().then((res) => {
            setUser(res.data);
        }).catch((err) => {
            console.log(err);
        });

        getWorkoutPlans().then((res) => {
            setWorkoutPlans(res.data);
        }).catch((err) => {
            console.error("Error fetching workout plans:", err);
        });
    }, []);

    const interpolateColor = (index, total) => {
        const startColor = [245, 133, 41];
        const endColor = [254, 92, 84];
        const step = total > 1 ? index / (total - 1) : 1;
        return `rgb(${startColor.map((start, i) => Math.round(start + (endColor[i] - start) * step))})`;
    };

    useEffect(() => {
        updateProfile(user)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
<<<<<<< HEAD
    }, [updateProfile, setUser, user]);
=======
    }, [isEditing]);
>>>>>>> 64d80152bb4a2462a48f2859cb8703791b8d6cd5

    function editableField(field, unit = '', isTableField = false, isDescriptionField = false) {
        const inputClass = isTableField ? "max-weight-input" : "user-info-input";
        const inputWidth = isTableField ? "inherit" : isDescriptionField ? "10rem" : "2rem";

        return isEditing[field] ? (
            <input
                type="text"
                value={editValues[field] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={() => toggleEdit(field)}
                className={inputClass}
                style={{ width: inputWidth }}
                autoFocus
            />
        ) : (
            <span className={inputClass} onClick={() => toggleEdit(field)}>{user[field]} {unit}</span>
        );
    }

    if (user === undefined) {
        return (
            <>
                <Loading margin={0} minHeight={"1000px"} />
            </>
        );
    }

    return (
        <div className="display-container mt-40 d-flex" style={{ paddingTop: '12rem' }}>
            <div className="row">
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="profile-image-container">
                        <img src="/profile.png" alt="Profile" className="profile-img mb-3" />
                    </div>
                    <div className="username" onClick={() => toggleEdit('username')}>
                        {isEditing.username ? editableField('username', '', false) : user.username}
                    </div>
                    <div className="user-stats">
                        <div className="profile-field">
                            <strong>Height:&nbsp;</strong>
                            {editableField('height', isEditing.height ? '' : 'ft', false, false)}
                        </div>
                        <div className="profile-field">
                            <strong>Weight:&nbsp;</strong>
                            {editableField('weight', isEditing.weight ? '' : 'lbs', false, false)}
                        </div>
                        <div className="profile-field">
                            <strong>Description:&nbsp;</strong>
                            {editableField('description', '', false, true)}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="right-content d-flex flex-column align-items-center">
                        <div className="row mb-3">
                            <div className="col" style={{ width: '20rem' }}>
                                <table className="profile-table">
                                    <thead>
                                        <tr>
                                            <th>Deadlift</th>
                                            <th>Squat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{editableField('deadlift', 'lbs', true, false)}</td>
                                            <td>{editableField('squat', 'lbs', true, false)}</td>
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
                                            <td>{editableField('ohp', 'lbs', true, false)}</td>
                                            <td>{editableField('bench', 'lbs', true, false)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br />
                        {workoutPlans.map((plan, index) => (
                            <div key={plan.id} className="workout-list darken" style={{ backgroundColor: interpolateColor(index, workoutPlans.length) }}>
                                {plan.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
