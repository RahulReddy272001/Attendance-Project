import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileGithubRepos from "./ProfileGithubRepos";
import Spinner from "../layout/Spinner";

const Profile = ({
  match,
  getProfileById,
  register,
  profile: { profile, loading },
}) => {
  useEffect(() => getProfileById(match.params.id), [
    getProfileById,
    match.params.id,
  ]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {register.isAuthenticated &&
            register.loading === false &&
            register.user._id === profile.user._id ? (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          ) : null}
          <div className="profile-grid my-1">
            {/* <!-- Top --> */}
            <ProfileTop profile={profile} />
            {/* <!-- About --> */}
            <ProfileAbout profile={profile} />
            {/* <!-- Education --> */}



          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {};

const mapStateToProps = (state) => ({
  register: state.register,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
