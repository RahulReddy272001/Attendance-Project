import { React, Fragment, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";


import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";


import Alert from "./components/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
//Redux
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";
import store from "./store";
import { setAuthtoken } from "./utils/setAuthToken";
import Profiles from "./components/profiles/Profiles";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";

import TeacherDashboard from "./components/dashboard/TeacherDashboard";
import AddEducation from "./components/profile/AddEducation";
import Profile from "./components/profile-main/Profile";
import TeacherRegister from "./components/auth/TeacherRegister";
import StudentRegister from "./components/auth/StudentRegister";
import TeacherLogin from "./components/auth/TeacherLogin";
import StudentLogin from "./components/auth/StudentLogin";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import Attendence from "./components/profiles/Attendence";
//Load user
if (localStorage.token) {
  setAuthtoken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}   >
      <Router>
        <Fragment>
          <Navbar />

          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/teacher-register" component={TeacherRegister} />
              <Route exact path="/student-register" component={StudentRegister} />
              <Route exact path="/teacher-login" component={TeacherLogin} />
              <Route exact path="/student-login" component={StudentLogin} />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/teacher-dashboard" component={TeacherDashboard} />
              <PrivateRoute exact path="/student-dashboard" component={StudentDashboard} />
              <PrivateRoute exact path="/teacher-dashboard/:id" component={Attendence} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />

              <PrivateRoute exact path="/profiles/:id" component={Profile} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
