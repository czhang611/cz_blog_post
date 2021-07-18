import React from 'react';
import classes from './UserProfile.module.css';
import ProfileForm from './ProfileForm';

const UserProfile = () => {
    return (
        <section className={classes.profile}>
            <h1>Your User profile.</h1>
            <ProfileForm />
        </section>
    )
}

export default UserProfile;