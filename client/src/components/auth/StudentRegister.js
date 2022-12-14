import React, { Fragment, useState } from "react";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    isTeacher: false
  });

  const { name, email, phone, password, password2, isTeacher } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      register({ name, email, phone, password, isTeacher });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/student-dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary"> Student Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="/student-login">Sign In</a>
      </p>
    </Fragment>
  );
};
const mapStatetoProps = (state) => ({
  isAuthenticated: state.register.isAuthenticated,
});

export default connect(mapStatetoProps, { setAlert, register })(Register);
