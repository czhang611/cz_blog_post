import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    const deleteHandler = (event) => {
        event.preventDefault();
        props.onDelete(props.title);
    }
    return (
        <li className={classes.post}>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
            <button className={classes.edit}>Edit</button>
            <button className={classes.delete} onClick={deleteHandler}>Delete</button>
        </li>
    );
};

export default Post;