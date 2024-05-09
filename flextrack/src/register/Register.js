import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import './Register.css';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/user'
});

function Register(props) {
    const [showPassword, setShowPassword] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    document.body.style.height = '0';

    const email = createContext();

    const verifyAccount = () => {
        let username = document.getElementById("username-input").value;
        let email = document.getElementById("email-input").value;
        let password = document.getElementById("pswd").value;

        instance.post("signup", { username, email, password })
            .then(response => {
                setSuccessMessage("Account Successfully Created!");
                setShowSuccessModal(true);
                setTimeout(() => {
                    navigate("/login");
                }, 2500);
            })
            .catch(error => {
                setErrorMessage(error.response?.data?.error || 'Registration failed');
                setShowErrorModal(true);
            });
    }

    const handleCloseErrorModal = () => setShowErrorModal(false);
    const handleCloseSuccessModal = () => setShowSuccessModal(false);

    return (
        <div>
            <div className="split left">
                <div className="color-orange-red"></div>
                <div className="flex">
                    <div className="dropdown login-dropdown">
                        <div className="logo-title">FLEXTRACK</div>
                        <a className="dropdown-text" href="#">The all-in-one fitness app!</a>
                    </div>
                    <div className="message-container">
                        <div className="welcome-back">Welcome Back!</div>
                        <div className="custom-message">Looking to shed a few pounds or put on some muscle? We've got you covered!</div>
                    </div>
                </div>
            </div>
            <div className="split right">
                <div className="login-container">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
                    <div className="login-label">Register</div>
                    <div className="username-label">Username</div>
                    <input id="username-input" type="text" placeholder="Enter Your Username" name="uname" required />
                    <div className="email-label">Email</div>
                    <input id="email-input" type="email" placeholder="Enter Your Email" name="email" required />
                    <div className="pswd-label">Password</div>
                    <div>
                        <input id="pswd" type={showPassword ? "password" : "text"} placeholder="Enter Your Password" name="psw" required />
                        {showPassword ?
                            <i className="bi bi-eye-slash input-password-eye" onClick={() => { setShowPassword(false) }} /> :
                            <i className="bi bi-eye input-password-eye" onClick={() => { setShowPassword(true) }} />}
                    </div>
                    <div className="conf-pswd-label">Confirm Password</div>
                    <div>
                        <input id="pswd" type={showPassword ? "password" : "text"} placeholder="Enter Your Password" name="psw" required />
                        {showPassword ?
                            <i className="bi bi-eye-slash input-password-eye" onClick={() => { setShowPassword(false) }} /> :
                            <i className="bi bi-eye input-password-eye" onClick={() => { setShowPassword(true) }} />}
                    </div>
                    <button className="login" type="login" onClick={() => {
                        verifyAccount();
                    }}>Register</button>
                    <div>
                        <label>Already a user?&nbsp;</label>
                        <a className="orange-link" onClick={() => { navigate("/login"); }}>Click here to log in!</a>
                    </div>
                    <div className="copy-right">Powered by Group 7</div>
                </div>
            </div>
            <Modal className="posts-modal" show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header className="posts-modal-header" closeButton>
                    <Modal.Title className="posts-modal-text">Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button className="posts-modal-button darken" onClick={handleCloseErrorModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal className="posts-modal" show={showSuccessModal} onHide={handleCloseSuccessModal}>
                <Modal.Header className="posts-modal-header" closeButton>
                    <Modal.Title className="posts-modal-text">Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{successMessage}</Modal.Body>
                <Modal.Footer>
                    <Button className="posts-modal-button darken" onClick={handleCloseSuccessModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Register;