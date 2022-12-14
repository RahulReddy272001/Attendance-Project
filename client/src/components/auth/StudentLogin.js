import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isTeacher: false
  });

  const { email, password, isTeacher } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login({ email, password, isTeacher });
  };
  if (isAuthenticated) {
    return <Redirect to="/student-dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Student Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Sign In Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            minLength="6"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont' have an account? <Link to="/student-register">Sign Up</Link>
      </p>
    </Fragment>
  );
};
const mapStatetoProps = (state) => ({
  isAuthenticated: state.register.isAuthenticated,
});

export default connect(mapStatetoProps, { login })(Login);
