import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar(props) {
    const navigate = useNavigate();
    const location = useLocation();  // Get the current location

    // Function to determine if the link is active
    const isActive = (route) => {
        return location.pathname === route ? "nav-link active" : "nav-link";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "rgba(42,87,131,1)" }}>
            <div className="container-fluid">
                <a className="navbar-brand" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>FLEXTRACK</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className={isActive('/createworkoutplan')} onClick={() => navigate('/createworkoutplan')} style={{ cursor: 'pointer' }}>My Workouts</a>
                        </li>
                        <li className="nav-item">
                            <a className={isActive('/social')} onClick={() => navigate('/social')} style={{ cursor: 'pointer' }}>Social</a>
                        </li>
                        <li className="nav-item">
                            <a className={isActive('/posts')} onClick={() => navigate('/posts')} style={{ cursor: 'pointer' }}>Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className={isActive('/challenges')} onClick={() => navigate('/challenges')} style={{ cursor: 'pointer' }}>Challenges</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className={isActive('/settings')} onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>Username</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;