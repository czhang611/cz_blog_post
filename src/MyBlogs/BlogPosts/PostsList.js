import React from 'react';
import Post from './Post';
import classes from './PostsList.module.css';

const PostsList = (props) => {
    const deleteHandler = (event) => {
        
    }
    return (
        <ul className={classes['posts-list']}>
            {props.posts.map((post) => (
                <Post
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    onDelete={deleteHandler}
                />
            ))}
        </ul>
    );
};

export default PostsList;