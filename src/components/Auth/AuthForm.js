import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const swtichAuthModeHandler = () => {
        setIsLogin(prevState => ! prevState);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        //const KEY = process.env.API_KEY;
        //const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + KEY;
        //const SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + KEY;
        const API_KEY = 'AIzaSyDYfDLiIij0yA7KwjVCzBfpzJ6_9vr-FNk';
        const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
        const SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;

        // Add validation
        // Web API Key

        // Sign up end point:
        // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

        // Sign in end point:
        // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

        setIsLoading(true);

        let url;
        if (isLogin) {
            url = SIGNIN_URL;
        } else {
            url = SIGNUP_URL;
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
                key: process.env.API_KEY
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setIsLoading(false);
            if (res.ok) {
                //console.log(res.json);
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Authentication failed';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }

                    //alert(errorMessage);
                    throw new Error(errorMessage);
                });
            }
        })
        .then((data) => {
            const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
            authCtx.login(data.idToken, expirationTime.toISOString(), enteredEmail);
            authCtx.email = enteredEmail;
            authCtx.isLoggedIn = true;
            history.replace('/');
            console.log("In AuthForm, authCtx = ", authCtx);
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'} </h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input id='email' type='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input id='password' type='password' ref={passwordInputRef} />
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Request sent. Loading... Please wait.</p>}
                    <button type='button' className={classes.toggle} onClick={swtichAuthModeHandler}>
                        {isLogin ? 'Create New Account' : 'Login with Existing Account'} 
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;