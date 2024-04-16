import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './Social.css';

function Social() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        {
            username: "John Do",
            deadlift: "300",
            squat: "250",
            ohp: "120",
            bench: "200",
            friend: "false"
        },
        {
            username: "Jane Do",
            deadlift: "210",
            squat: "180",
            ohp: "90",
            bench: "150",
            friend: "false"
        }
    ]);

    const onHandleCardClick = () => {
        navigate('/profile');
    };

    const onHandleAddFriend = (index) => {
        const newUsers = [...users];
        newUsers[index].friend = "true";
        setUsers(newUsers);
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
                users.map((user, index) => (
                    <div key={index} onClick={onHandleCardClick} className="card-wrapper mb-3">
                        <div className="card" style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                            <div className="card-body d-flex align-items-center">
                                <div className="profile-img-container me-3">
                                    <img src="/profile.png" alt="profile" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label className="username mb-2">{user.username}</label>
                                    {user.friend === "false" ? <button className='add-friend' onClick={(e) => {
                                        e.stopPropagation();
                                        onHandleAddFriend(index);
                                    }}>+ Add</button> : <button className='added-friend' onclick={() => { }}>Added</button>}
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
                ))
            }
        </div >
    );
}

export default Social;
