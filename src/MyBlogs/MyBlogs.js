import React, { useState, useEffect, useCallback } from 'react';
import PostsList from './BlogPosts/PostsList';
import AddPost from './BlogPosts/AddPost';
import classes from './MyBlogs.module.css';
//import FirebaseService from '../components/Firebase/FirebaseService';

const MyBlogs = () => {
    const [ posts, setPosts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const BLOGPOSTS_URL = 'https://cz-blog-posts-default-rtdb.firebaseio.com/blogposts.json';

    const fetchPostsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(BLOGPOSTS_URL);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            const loadedPosts = [];
            for (const key in data) {
                loadedPosts.push({
                    id: key,
                    email: data[key].email,
                    title: data[key].title,
                    content: data[key].content
                });
            }

            //console.log("In fetchPostsHandler in MyBlogs.js, loadedPosts = ", loadedPosts);
            setPosts(loadedPosts);

//            const transformedPosts = data.results.map((postData) => {
//                return {
//                    id: postData.id,
//                    email: postData.email,
//                    title: postData.title,
//                    content: postData.content
//                };
//            });
//
//            setPosts(transformedPosts);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchPostsHandler();
    }, [fetchPostsHandler]);

    async function addPostHandler(post) {
        //console.log("In MyBlogs.js addPostHandler, post = ", post);
        //const response = await fetch(BLOGPOSTS_URL, {
        await fetch(BLOGPOSTS_URL, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //const data = await response.json();
        //console.log("In MyBlogs, data = ", data);
        fetchPostsHandler();
    }

//    async function deletePostHandler(postId) {
//        console.log("In MyBlogs.js deletePostHandler, postID = ", postId);
//
//        //const deletedPost = {
//        //    title: post.title,
//        //    email: post.email,
//        //    content: post.email
//        //};
//
//        //const response = await fetch(BLOGPOSTS_URL, {
//
//        //await fetch(BLOGPOSTS_URL, {
//        //    method: 'DELETE',
//        //    body: JSON.stringify(deletedPost),
//        //    headers: {
//        //        'Content-Type': 'application/json'
//        //    }
//        //});
//
//        //console.log(response.json());
//        //const data = await response.json();
//        //console.log("In MyBlogs, data = ", data);
//
//        //fetchPostsHandler();
//    }

    let content = <p>Found no posts.</p>;

    if (posts.length > 0) {
        //console.log("In MyBlogs.js, posts = ", posts);
        //content = <PostsList posts={posts} onDelete={deletePostHandler} />;
        content = <PostsList posts={posts} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading your posts... Please wait.</p>;
    }

    return (
        <React.Fragment>
            <section className={classes.section}>
                <AddPost onAddPost={addPostHandler} />
            </section>
            <section className={classes.section}>
                <button onClick={fetchPostsHandler}>Fetch Posts</button>
            </section>
            <section className={classes.section}>
                {content}
            </section>
        </React.Fragment>
    );
}

export default MyBlogs;