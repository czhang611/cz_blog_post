import React from 'react';
import { connect } from 'react-redux';
import classes from './UserHeader.module.css';

class UserHeader extends React.Component {

    render() {
        const { user } = this.props ;

        if (!user) {
            return null;
        }

        return <div className={classes.header}>{user.name}</div>;
    }
}


const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(
    mapStateToProps, 
    ) (UserHeader);