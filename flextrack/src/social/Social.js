import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './Social.css';

function Social() {
    // Dummy data for user display
    const users = [
        {
            username: "John Do",
            deadlift: "300",
            squat: "250",
            ohp: "120",
            bench: "200"
        },
        {
            username: "Jane Do",
            deadlift: "210",
            squat: "180",
            ohp: "90",
            bench: "150"
        }
    ];

    return (
        <div className="display-container">
            <div className="container" style={{ width: '40rem' }}>
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
                        style={{ border: 'none', outline: 'none', width: '100%' }}
                    />
                    <FontAwesomeIcon icon={faFilter} className="me-3" />
                </div>

                {users.map((user, index) => (
                    <div className="card-wrapper">
                        <div key={index} className="card mb-3" style={{ height: '10rem', background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                            <div className="card-body d-flex">
                                <img src="/profile.png" alt="profile" style={{
                                    width: '50px', height: '50px', borderRadius: '50%', border: '1px solid black'
                                }} />
                                <div className="ms-3">
                                    <label className="username">{user.username}</label>
                                    <table>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Social;