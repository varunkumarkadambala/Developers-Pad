import React, {Fragment, useEffect} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {getCurrentProfile} from "../../actions/profile";
import {connect} from 'react-redux';
import Spinner from "../skeleton/Spinner";
import DashboardActions from './DashboardActions';

const Dashboard = ({getCurrentProfile, auth : {user}, profile: {profile, loading}}) => {

    useEffect(() => {
        getCurrentProfile();
    }, []);
    return loading && profile === null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary"> Dashboard </h1>
        <p className="lead">
            <i className="fas fa-user"/> Hello { user && user.name}!!!
        </p>
        {profile !== null ?(
            <Fragment>
                <DashboardActions />
            </Fragment>
        ): <Fragment>
                You have not built your profile yet. Click below to create a new profile.
                <br/>
                <Link to='/create-profile' className = 'btn btn-primary my-1'>
                    Create Profile
                </Link>
            </Fragment>}
    </Fragment>;
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);