import React, { useRef, useContext } from 'react';
import classes from './AddPost.module.css';
import AuthContext from '../../store/auth-context';

const AddPost = (props) => {
    const titleRef = useRef('');
    const contentRef = useRef('');
    const authCtx = useContext(AuthContext);
    const email = authCtx.email;


    const submitHandler = (event) => {
        event.preventDefault();

        const post = {
            //id: Math.random().toString(),
            email: email,
            title: titleRef.current.value,
            content: contentRef.current.value
        };

        props.onAddPost(post);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' ref={titleRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='content'>Blog Content</label>
                <textarea rows='5' id='content' ref={contentRef} />
            </div>
            <button className={classes.button}>Add Post</button>
        </form>
    );
};

export default AddPost;