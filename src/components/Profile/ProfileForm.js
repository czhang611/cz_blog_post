import React, { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
    const history = useHistory();
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    // Change Password end point:
    // https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]

    //const KEY = process.env.API_KEY;
    //const CHANGE_PASSWORD_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + KEY;    
    const API_KEY = 'AIzaSyDYfDLiIij0yA7KwjVCzBfpzJ6_9vr-FNk';
    const CHANGE_PASSWORD_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + API_KEY    

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredPassword = newPasswordInputRef.current.value;

        fetch(CHANGE_PASSWORD_URL, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            // Assume password change successful
            console.log(('Password changed'));
            history.replace('/');
        })

    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' ref={newPasswordInputRef} />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>

    );
}

export default ProfileForm;