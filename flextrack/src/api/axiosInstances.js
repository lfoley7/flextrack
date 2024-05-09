import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const challengeInstance = axios.create({
    withCredentials: true,
    baseURL: `${API_BASE_URL}/challenge`
});

const userInstance = axios.create({
    withCredentials: true,
    baseURL: `${API_BASE_URL}/user`
});

const workoutInstance = axios.create({
    withCredentials: true,
    baseURL: `${API_BASE_URL}/workout`
});

const exerciseInstance = axios.create({
    withCredentials: true,
    baseURL: `${API_BASE_URL}/exercise`
});

const profileInstance = axios.create({
    withCredentials: true,
    baseURL: `${API_BASE_URL}/profile`
});

const postInstance = axios.create({
    withCredentials: true,
    baseURL: `${API_BASE_URL}/post`
});

export { challengeInstance, userInstance, workoutInstance, exerciseInstance, profileInstance, postInstance };
