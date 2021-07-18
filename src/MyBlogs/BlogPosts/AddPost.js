import React, { useRef } from 'react';
import classes from './AddPost.module.css';

const AddPost = (props) => {
    const titleRef = useRef('');
    const contentRef = useRef('');

    const submitHandler = (event) => {
        event.preventDefault();

        const post = {
            //id: Math.random().toString(),
            email:'cz05d@my.fsu.edu',
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