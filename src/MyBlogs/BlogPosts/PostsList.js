import React from 'react';
import Post from './Post';
import classes from './PostsList.module.css';
import FirebaseService from '../../components/Firebase/FirebaseService';


const PostsList = (props) => {
    //console.log("In PostsList.js, props = ", props);

    const deleteHandler = (props) => {
        console.log("In deleteHandler in PostsList.js, props = ", props);
        console.log("In deleteHandler in PostsList.js, props.id = ", props.id);
        //props.onDelete(props.id);
        FirebaseService.remove(props.id);
    }

    return (
        <ul className={classes['posts-list']}>
            {props.posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    email={post.email}
                    onDelete={deleteHandler}
                />
            ))}
        </ul>
    );
};

export default PostsList;