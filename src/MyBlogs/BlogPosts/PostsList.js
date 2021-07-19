import React from 'react';
import Post from './Post';
import classes from './PostsList.module.css';

const PostsList = (props) => {
    console.log("In PostsList.js, props = ", props);

    const deleteHandler = (event) => {

    }
    return (
        <ul className={classes['posts-list']}>
            {props.posts.map((post) => (
                <Post
                    key={post.id}
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