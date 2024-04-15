import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './Social.css';

function Social() {
    const navigate = useNavigate();

    const users = [
        {
            username: "John Do",
            deadlift: "300",
            squat: "250",
            ohp: "120",
            bench: "200",
            friend: "true"
        },
        {
            username: "Jane Do",
            deadlift: "210",
            squat: "180",
            ohp: "90",
            bench: "150",
            friend: "false"
        }
    ];

    const onHandleCardClick = () => {
        navigate('/profile');
    };

    return (
        <div className="display-container" style={{ width: '40rem', margin: 'auto', display: 'inherit', paddingTop: '.4rem' }}>
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
                                    {user.friend === "false" ? <button className='add-friend'>+ Add</button> : null}
                                    < table className="w-100">
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
                ))
            }
        </div >
    );
}

export default Social;
