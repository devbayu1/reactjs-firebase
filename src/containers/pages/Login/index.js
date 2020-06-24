import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUserAPI } from "../../../config/redux/action";
import Button from "../../../components/atoms/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  changeUser = () => {
    this.props.changeUserName();
  };

  handleChange = (e) => {
    let targ = e.target;
    let val = targ.value;
    let name = targ.name;

    this.setState({
      [name]: val,
    });
  };

  handleLogin = async () => {
    const { email, password } = this.state;
    const { history } = this.props;

    const res = await this.props
      .loginAPI({ email, password })
      .catch((err) => err);
    if (res) {
      
      localStorage.setItem('user', JSON.stringify(res));
      
      this.setState(
        {
          email: "",
          password: "",
        },
        () => {
          history.push("/");
        }
      );
    } else {
      console.log("Login Failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p>Login</p>
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
            onClick={this.handleLogin}
            title="Login"
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
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
