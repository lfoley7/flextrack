import React, { useState, useEffect } from 'react';
import { useParams }  from 'react-router-dom';
import './Profile.css';
import axios from "axios";
import Loading from '../loading/Loading';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/profile'
});

const getProfile = async (id) => {
    return await instance.get("get", { params: { id: id } });
}

function Profile(props) {

    let { userId } = useParams();

    const [user, setUser] = useState();

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

      
    if(user === undefined) {
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
                    <div className="username">{user.username}</div>
                    <div className="user-stats">
                        <p><strong>Height:</strong> {user.height} ft</p>
                        <p><strong>Weight:</strong> {user.weight} lbs</p>
                        <p className="user-description"><strong>Description:</strong>{user.description}</p>
                        <p className="user-description">{user.description}</p>
                    </div>
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
                        {/* <button className="btn btn-primary login" style={{ width: '20rem' }}>Day 1 - Push</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
