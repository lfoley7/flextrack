import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Posts.css';

function Posts(props) {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([
        {
            username: "John Do",
            date: new Date("2023-04-10"),
            content: "Just hit 225 on bench!",
            profileImg: "/profile.png",
            comments: [
                { username: "Jane Doe", comment: "Show that barbell who's boss!", profileImg: "/profile.png" },
                { username: "Mike Smith", comment: "Awesome job!", profileImg: "/profile.png" },
            ]
        },
        {
            username: "Jane Do",
            date: new Date("2023-04-11"),
            content: "Just hit 315 on squat!",
            profileImg: "/profile.png",
            comments: [
                { username: "John Doe", comment: "Get out of her whey!", profileImg: "/profile.png" }
            ]
        }
    ]);

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

    return (
        <div className="display-container" style={{ alignItems: 'flex-start' }}>
            <button className="make-posts-button" onClick={handleMakePost}>Make a Post</button>
            {posts.map((post, index) => (
                <div>
                    <div key={index} className="post-wrapper">
                        <div className="post-content">
                            <div className="post-top d-flex align-items-center" style={{ background: '#F58528' }}>
                                <div className="posts-profile-image-container">
                                    <img src={post.profileImg} alt="Profile" className="posts-profile-img" />
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
            ))
            }
        </div >
    );
}

export default Posts;
