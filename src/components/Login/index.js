import React from "react";
import { Component } from "react";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    verifyPassword: "",
    isValid: false,
    isSignUpClicked: false,
    isLoginClicked: true,
    isSignUpValid: false,
    isSignUpSuccess: false,
    isLoginSuccess: false,
  };

  onChangeUserName = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeVerifyPassword = (event) => {
    this.setState({ verifyPassword: event.target.value });
  };

  onClickCreateAccount = () => {
    const { isSignUpClicked, isLoginClicked } = this.state;
    this.setState({
      isSignUpClicked: !isSignUpClicked,
      username: "",
      password: "",
      isValid: false,
      isLoginClicked: !isLoginClicked,
    });
  };

  onCheckUser = () => {
    const { username, password } = this.state;
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails !== null) {
      return userDetails.map((eachUser) => {
        if (eachUser.username === username && eachUser.password === password) {
          return true;
        }
      });
      return false;
    }
  };

  onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    if (username !== "" && password !== "") {
      document.querySelector("#login-button").disabled = true;
      document.querySelector("#form-username").disabled = true;
      document.querySelector("#form-password").disabled = true;
      const result = this.onCheckUser();
      if (result) {
        this.setState({
          isValid: false,
          username: "",
          password: "",
          isLoginSuccess: true,
        });
      } else {
        this.setState({ isValid: true });
      }
    } else {
      this.setState({ isValid: true });
    }
  };

  onSubmitSignUpForm = (event) => {
    event.preventDefault();
    const { username, password, verifyPassword } = this.state;
    if (password === verifyPassword && username !== "") {
      document.querySelector("#signup-button").disabled = true;
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      let updatedUserDetails;
      if (userDetails !== null) {
        updatedUserDetails = [...userDetails, { username, password }];
      } else {
        updatedUserDetails = [{ username, password }];
      }
      localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
      this.setState({
        isSignUpValid: false,
        isSignUpSuccess: true,
        username: "",
        password: "",
        verifyPassword: "",
      });
    } else {
      this.setState({ isSignUpValid: true });
    }
  };

  moveToLogin = () => {
    this.setState({
      isSignUpClicked: false,
      isLoginClicked: true,
      isSignUpSuccess: false,
    });
  };

  moveToLogout = () => {
    this.setState({ isSignUpClicked: false, isLoginClicked: false });
  };

  renderUserNameContainer = () => {
    const { username } = this.state;
    return (
      <div className="input-container">
        <label htmlFor="form-username" className="label-element">
          Username
        </label>
        <input
          id="form-username"
          type="text"
          value={username}
          className="input-element"
          onChange={this.onChangeUserName}
          style={{ paddingLeft: "8px" }}
          placeholder="Enter Useename"
        />
      </div>
    );
  };

  renderPasswordContainer = () => {
    const { password } = this.state;
    return (
      <div className="input-container">
        <label htmlFor="form-password" className="label-element">
          PASSWORD
        </label>
        <input
          id="form-password"
          type="password"
          value={password}
          className="input-element"
          onChange={this.onChangePassword}
          style={{ paddingLeft: "8px" }}
          placeholder="Enter Password"
        />
      </div>
    );
  };

  renderReenterPasswordContainer = () => {
    const { verifyPassword } = this.state;
    return (
      <div className="input-container">
        <label htmlFor="form-password" className="label-element">
          VERIFY PASSWORD
        </label>
        <input
          id="form-password"
          type="password"
          value={verifyPassword}
          className="input-element"
          onChange={this.onChangeVerifyPassword}
          style={{ paddingLeft: "8px" }}
          placeholder="Enter Password"
        />
      </div>
    );
  };

  render() {
    const {
      isSignUpClicked,
      isLoginClicked,
      isValid,
      isSignUpValid,
      isSignUpSuccess,
      isLoginSuccess,
    } = this.state;
    return (
      <>
        <div className="login-bg-container">
          {isLoginClicked && (
            <form
              className="form-container"
              onSubmit={this.onSubmitLoginForm}
              id="login-form"
            >
              <h1 className="form-heading">Login</h1>
              {this.renderUserNameContainer()}
              {this.renderPasswordContainer()}
              {isValid && (
                <p className="invalid-text">
                  Please enter a valid Username & Password
                </p>
              )}
              <button type="submit" className="form-button" id="login-button">
                LOGIN
              </button>
              {!isLoginSuccess && (
                <p className="text">
                  Don't have an account?{" "}
                  <button
                    onClick={this.onClickCreateAccount}
                    style={{
                      fontSize: "0.8rem",
                      border: "none",
                      outline: "none",
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                      color: "blue",
                    }}
                  >
                    Create new user
                  </button>
                </p>
              )}
              {isLoginSuccess && (
                <p className="text">
                  You are Succesfully Logged In.{" "}
                  <button
                    onClick={this.moveToLogout}
                    style={{
                      fontSize: "0.8rem",
                      border: "none",
                      outline: "none",
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                      color: "blue",
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    Click here to Logout
                  </button>
                </p>
              )}
            </form>
          )}
          {isSignUpClicked && (
            <form className="form-container" onSubmit={this.onSubmitSignUpForm}>
              <h1 className="form-heading">Sign Up</h1>
              {this.renderUserNameContainer()}
              {this.renderPasswordContainer()}
              {this.renderReenterPasswordContainer()}
              {isSignUpValid && (
                <p className="invalid-text">
                  Please enter a valid Username & Password
                </p>
              )}
              {isSignUpSuccess && (
                <p className="text">
                  You are Succesfully Registered.
                  <button
                    onClick={this.moveToLogin}
                    style={{
                      fontSize: "0.8rem",
                      border: "none",
                      outline: "none",
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                      color: "blue",
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    Move to Login Page
                  </button>{" "}
                </p>
              )}
              <button type="submit" id="signup-button" className="form-button">
                SignUp
              </button>
            </form>
          )}
          {!isLoginClicked && !isSignUpClicked && (
            <p className="logout-msg">You are Succesfully Logged Out</p>
          )}
        </div>
        <div className="login-mobile-view-container">
          {isLoginClicked && (
            <form
              className="login-mobile-form-container"
              onSubmit={this.onSubmitLoginForm}
            >
              <h1 className="mobile-login-heading">Login</h1>
              {this.renderUserNameContainer()}
              {this.renderPasswordContainer()}
              {isValid && (
                <p className="invalid-text">
                  Please enter a valid Username & Password
                </p>
              )}
              <button type="submit" className="form-button">
                LOGIN
              </button>
              {!isLoginSuccess && (
                <p className="text">
                  Don't have an account?{" "}
                  <button
                    onClick={this.onClickCreateAccount}
                    style={{
                      fontSize: "0.8rem",
                      border: "none",
                      outline: "none",
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                      color: "blue",
                    }}
                  >
                    Create new user
                  </button>
                </p>
              )}
              {isLoginSuccess && (
                <p className="text">
                  You are Succesfully Logged In.{" "}
                  <button
                    onClick={this.moveToLogout}
                    style={{
                      fontSize: "0.8rem",
                      border: "none",
                      outline: "none",
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                      color: "blue",
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    Click here to Logout
                  </button>
                </p>
              )}
            </form>
          )}
          {isSignUpClicked && (
            <form
              className="login-mobile-form-container"
              onSubmit={this.onSubmitSignUpForm}
            >
              <h1 className="mobile-login-heading">Sign Up</h1>
              {this.renderUserNameContainer()}
              {this.renderPasswordContainer()}
              {this.renderReenterPasswordContainer()}
              {isSignUpValid && (
                <p className="invalid-text">
                  Please enter a valid Username & Password
                </p>
              )}
              {isSignUpSuccess && (
                <p className="text">
                  You are Succesfully Registered.
                  <button
                    onClick={this.moveToLogin}
                    style={{
                      fontSize: "0.8rem",
                      border: "none",
                      outline: "none",
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                      color: "blue",
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    Move to Login Page
                  </button>{" "}
                </p>
              )}
              <button type="submit" className="form-button">
                SignUp
              </button>
            </form>
          )}
          {!isLoginClicked && !isSignUpClicked && (
            <p className="logout-msg">You are Succesfully Logged Out</p>
          )}
        </div>
      </>
    );
  }
}

export default Login;
