import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Posts.css';

import axios from 'axios';
import Loading from '../loading/Loading';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/post'
});

const getPosts = async () => {
    return await instance.get("get-all");
}

const createPost = async (post) => {
    return await instance.post("create", post);
}

function Posts(props) {
    const navigate = useNavigate();

    const [posts, setPosts] = useState();

    const handleMakePost = () => {
        const postText = window.prompt("Write your post text:");
        if (postText) {
            const newPost = {
                username: "Current User",
                date: new Date(),
                content: postText,
                profileImg: "/profile.png",
                comments: []
            };
            setPosts(prevPosts => [newPost, ...prevPosts]);
        }
    };

    useEffect(() => {
        getPosts()
        .then((res) => {
            console.log(res.data)
            setPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
      }, []);
    
    if(posts === undefined) {
        return (
            <>
                <Loading margin={0} minHeight={"1000px"} />
            </>
        );
    }

    return (
        <div className="display-container" style={{ alignItems: 'flex-start' }}>
            <button className="make-posts-button" onClick={handleMakePost}>Make a Post</button>
            { posts.length > 0 ?
            posts.map((post, index) => (
                <div>
                    <div key={index} className="post-wrapper">
                        <div className="post-content">
                            <div className="post-top d-flex align-items-center">
                                <div className="posts-profile-image-container">
                                    <img src={"/profile.png"} alt="Profile" className="posts-profile-img" />
                                </div>
                                <h3 style={{ color: 'white', fontWeight: '700', marginLeft: '1rem' }}>{post.username}</h3>
                            </div>
                            <div className="post-bottom">
                                <p style={{ fontStyle: 'italic', color: '#777' }}>{post.content}</p>
                                <div className="date-container">
                                    {post.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comments">
                        {post.comments.map((comment, idx) => (
                            <div
                                key={idx}
                                className={`comment d-flex align-items-center ${idx === post.comments.length - 1 ? 'last-comment' : ''}`}
                            >
                                <div className="posts-profile-image-container-small">
                                    <img src="/profile.png" alt="Profile" className="posts-profile-img-small" />
                                </div>
                                <p style={{ fontStyle: 'italic', color: '#777', marginLeft: '.5rem' }}>
                                    {comment.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )) : <p>No posts found</p>
            }
        </div >
    );
}

export default Posts;
