import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile, deleteAccount } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import ProfileItem from "../profiles/ProfileItem";
import Education from "./Education";
import { getAllUsers } from "../../actions/auth";
const Dashboard = ({
  profile: { profile },
  getProfile,
  deleteAccount,
  history,
  getAllUsers,
  register: { user, loading },
  users
}) => {
  useEffect(() => getAllUsers(), [getAllUsers]);
  console.log(users)
  return (
    <Fragment>
      <h1 className="large text-primary">Teacher Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>

      <div>
        {users.length > 0 && users.map((item) => item.isTeacher == false && (

          <ProfileItem id={item._id} name={item.name} email={item.email} phone={item.phone} />
        ))

        }


      </div>




      {profile ? (
        <Fragment>
          <DashboardActions />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p>Congratulations Teacher login successfull</p>
          {/* <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link> */}
        </Fragment>
      )}

      <div className="my-2">
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  profile: state.profile,
  register: state.register,
  users: state.register.users
});

export default connect(mapStatetoProps, { getAllUsers, deleteAccount })(
  withRouter(Dashboard)
);
