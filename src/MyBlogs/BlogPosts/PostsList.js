import React from 'react';
//import ReactDOM from 'react-dom';
import Post from './Post';
import classes from './PostsList.module.css';
import FirebaseService from '../../components/Firebase/FirebaseService';
//import EditPost from './EditPost';


const PostsList = (props) => {
    //console.log("In PostsList.js, props = ", props);

    const editHandler = (props) => {
        const newTitle = prompt("Please enter a new blog title: \n");
        const newContent = prompt("Please enter new blog content: \n");

        const updatedPost = {
            title: newTitle,
            content: newContent,
            email: props.email
        }

        FirebaseService.update(props.id, updatedPost);
    }

    const deleteHandler = (props) => {
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
                    onEdit={editHandler}
                    onDelete={deleteHandler}
                />
            ))}
        </ul>
    );
};

export default PostsList;