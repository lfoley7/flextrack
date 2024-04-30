import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './Social.css';
import axios from 'axios';
import Loading from '../loading/Loading';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/profile'
});

const friendInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/user'
});

const getProfiles = async () => {
    return await instance.get("get-all");
}

const addFriend = async (user) => {
    return await friendInstance.post("add-friend", user);
}

function Social() {
    const navigate = useNavigate();

    const [users, setUsers] = useState();
    const [update, setUpdate] = useState(false);

    const onHandleCardClick = (id) => {
        navigate('/profile/' + id);
    };

    const onHandleAddFriend = async (index) => {
        await addFriend(users[index].user)
        setUpdate(!update)
    }

    useEffect(() => {
        getProfiles()
            .then((res) => {
                console.log(res.data)
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [update]);

    if (users === undefined) {
        return (
            <>
                <Loading margin={0} minHeight={"1000px"} />
            </>
        );
    }

    return (
        <div className="display-container" style={{ width: '40rem', margin: 'auto', display: 'inherit', paddingTop: '.4rem' }}>
            <button className="view-posts-button" onClick={() => { navigate('/posts') }}>View Posts</button>
            <div className="search-bar mt-3 mb-3 p-2" style={{
                borderRadius: '50px',
                background: 'white',
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <FontAwesomeIcon icon={faSearch} className="ms-3" />
                <input
                    type="text"
                    placeholder="Search"
                    style={{ border: 'none', outline: 'none', width: '100%', marginLeft: '.5rem' }}
                />
                <FontAwesomeIcon icon={faFilter} className="me-3" />
            </div>

            {
                users.length > 0 ?
                    users.map((user, index) => (
                        <div key={index} onClick={(e) => {
                            e.stopPropagation();
                            onHandleCardClick(user.id);
                        }} className="card-wrapper mb-3">
                            <div className="card" style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                                <div className="card-body d-flex align-items-center">
                                    <div className="profile-img-container me-3">
                                        <img src="/profile.png" alt="profile" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label className="username mb-2">{user.username}</label>
                                        {user.friend == false ? <button className='add-friend' onClick={(e) => {
                                            e.stopPropagation();
                                            onHandleAddFriend(index);
                                        }}>+ Add</button> : <button className='added-friend' onClick={() => { }}>Added</button>}
                                        <table className="social-table w-100">
                                            <thead>
                                                <tr>
                                                    <th>Deadlift</th>
                                                    <th>Squat</th>
                                                    <th>OHP</th>
                                                    <th>Bench</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{user.deadlift}</td>
                                                    <td>{user.squat}</td>
                                                    <td>{user.ohp}</td>
                                                    <td>{user.bench}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )) : <p>No users found</p>
            }
        </div >
    );
}

export default Social;
