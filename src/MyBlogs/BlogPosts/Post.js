import React, { useContext } from 'react';
import classes from './Post.module.css';
import AuthContext from '../../store/auth-context';

const Post = (props) => {
    const authCtx = useContext(AuthContext);
    const email = authCtx.email;
    //console.log("email in authCtx = ", email);
    //console.log("In Post.js, props = ", props);
    //console.log(email === props.email);

    const editHandler = (event) => {
        event.preventDefault();
        props.onEdit(props);
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        //console.log("In deleteHandler in Post.js: props = ", props);
        props.onDelete(props);
    }

    return (
        <li className={classes.post}>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
            { email === props.email && (
                <React.Fragment>
                    <button className={classes.edit} onClick={editHandler}>Edit</button>
                    <button className={classes.delete} onClick={deleteHandler}>Delete</button>
                </React.Fragment>          
            )}
        </li>
    );
};

export default Post;