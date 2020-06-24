import React, { Component } from "react";
import "./Register.scss";
import Button from "../../../components/atoms/Button";
import { registerUserAPI } from "../../../config/redux/action";
import { connect } from "react-redux";

class Register extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    let targ = e.target;
    let val = targ.value;
    let name = targ.name;

    this.setState({
      [name]: val,
    });
  };

  handleRegister = async () => {
    const { email, password } = this.state;
    const res = await this.props
      .registerAPI({ email, password })
      .catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p>Register</p>
          <input
            className="input"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <Button
            onClick={this.handleRegister}
            title="Register"
            loading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
