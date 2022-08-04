import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
const Landing = ({ register: { isAuthenticated }, user }) => {
  if (isAuthenticated) {
    return user.isTeacher ? <Redirect to="/teacher-dashboard" /> : <Redirect to="/student-dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Attendance Management System</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/teacher-login" className="btn btn-primary">
              Teacher Login
            </Link>
            <Link to="/student-login" className="btn btn-light">
              Student Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStatetoProps = (state) => ({
  register: state.register,
  user: state.register.user

});
export default connect(mapStatetoProps)(Landing);
