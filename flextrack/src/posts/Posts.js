import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
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

const addComment = async (comment) => {
    return await instance.post("add-comment", comment);
}

function Posts(props) {

    const navigate = useNavigate();

    const [posts, setPosts] = useState();
    const [update, setUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');

    const onHandleCommentClick = (id) => {
        navigate('/profile/' + id);
    };

    const handleMakePost = async () => {
        if (postTitle && postText) {
            const newPost = {
                title: postTitle,
                caption: postText,
                date: new Date(),
            };
            await createPost(newPost)
                .then((res) => {
                    setPosts(res.data);
                    setShowModal(false);
                    setPostTitle('');
                    setPostText('');
                })
                .catch((err) => {
                    console.error(err);
                });
            setUpdate(!update);
        }
    };

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const handleAddComment = async (postId) => {
        const commentText = window.prompt("Write your comment text:");
        if (commentText) {
            const newPost = {
                postId: postId,
                caption: commentText,
                date: new Date(),
            };
            await addComment(newPost).catch((err) => {
                console.log(err);
            });
            setUpdate(!update);
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
    }, [update]);

    if (posts === undefined) {
        return (
            <>
                <Loading margin={0} minHeight={"1000px"} />
            </>
        );
    }

    return (
        <div className="display-container" style={{ alignItems: 'flex-start' }}>
            <button onClick={handleModalShow} className="make-posts-button">Make a Post</button>
            <Modal className="posts-modal" show={showModal} onHide={handleModalClose}>
                <Modal.Header className="posts-modal-header" closeButton>
                    <Modal.Title className="posts-modal-text">Make a New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter post title"
                                value={postTitle}
                                onChange={e => setPostTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Post Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="What's on your mind?"
                                value={postText}
                                onChange={e => setPostText(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button className="posts-modal-button darken" onClick={handleMakePost}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
            {posts.length > 0 ?
                posts.map((post) => (
                    <div>
                        <div key={post.id} className="post-wrapper">
                            <div className="post-content">
                                <div className="post-top d-flex align-items-center">
                                    <div className="posts-profile-image-container">
                                        <img src={"/profile.png"} alt="Profile" className="posts-profile-img" />
                                    </div>
                                    <h3 onClick={() => onHandleCommentClick(post.created_by.id)} style={{ color: 'white', fontWeight: '700', marginLeft: '1rem' }}>{post.created_by.profile.username}</h3>
                                </div>
                                <div className="post-bottom">
                                    <h4 style={{ color: 'black', fontWeight: '700' }}>{post.title}</h4>
                                    <p style={{ fontStyle: 'italic', color: '#777' }}>{post.caption}</p>
                                    <div>
                                        <div className="date-container">
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="comment-button-container">
                                            <button className='make-comment-button' value={post.id} onClick={(e) => handleAddComment(e.target.value)}>Comment</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="comments">
                            {post.comments.map((comment, idx) => (
                                <div
                                    key={comment.id}
                                    className={`comment d-flex-column align-items-center ${idx === post.comments.length - 1 ? 'last-comment' : ''}`}
                                >
                                    <div className={`d-flex align-items-center`}>
                                        <div className="posts-profile-image-container-small">
                                            <img src="/profile.png" alt="Profile" className="posts-profile-img-small" />
                                        </div>
                                        <p style={{ color: 'black', fontWeight: '700', marginLeft: '.5rem' }}
                                            onClick={() => onHandleCommentClick(comment.created_by.id)}>
                                            {comment.created_by.profile.username}
                                        </p>
                                    </div>
                                    <p style={{ fontStyle: 'italic', color: '#777' }}>
                                        {comment.caption}
                                    </p>
                                    <div className="date-container">
                                        {new Date(comment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
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
