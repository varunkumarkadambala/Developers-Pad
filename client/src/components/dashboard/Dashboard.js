import React, {Fragment, useEffect} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {getCurrentProfile, deleteAccount} from "../../actions/profile";
import {connect} from 'react-redux';
import Spinner from "../skeleton/Spinner";
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';


const Dashboard = ({getCurrentProfile, deleteAccount, auth : {user}, profile: {profile, loading}}) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary"> Dashboard </h1>
        <p className="lead">
            <i className="fas fa-user"/> Hello { user && user.name}!!!
        </p>
        {profile !== null ?(
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />

                <div className='my-2'>
                    <button className='btn btn-danger' onClick={() => deleteAccount()}>
                        <i className='fas fa-user-minus' /> Delete My Account
                    </button>
                </div>
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
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);