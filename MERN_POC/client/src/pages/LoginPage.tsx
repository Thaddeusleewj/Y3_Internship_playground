import React, { FormEvent, useState } from "react";

// Importing dependencies
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Importing Icons
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./css/LoginPage.css";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  // State for sign up form
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for login form
  const [loginForm, setLoginForm] = useState({
    loginUsername: "",
    loginPassword: "",
  });

  // Destructure form values
  const { username, email, password, confirmPassword } = signupForm;
  const { loginUsername, loginPassword } = loginForm;

  const navigate = useNavigate();

  // // Update sign up form values
  // const handleSignupFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSignupForm({
  //     ...signupForm,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // // Update login form values
  // const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLoginForm({
  //     ...loginForm,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // Changing register state method
  const changeRegisterState = (e: any) => {
    e.preventDefault();
    setIsRegistering(!isRegistering);
  };

  // Login Method
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // Log out login form values
    console.log("Login Form Values:", loginForm);
    // Perform login logic here
  };

  // Signup Method
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/user/register", signupForm);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="loginBody">
      <ToastContainer />
      <div className="wrapper">
        <form>
          <h1>{isRegistering ? "Register" : "Login"}</h1>
          {!isRegistering && (
            <>
              <div className="input-box">
                <input
                  type="username"
                  placeholder="Username"
                  required
                  value={loginUsername}
                  onChange={(e) =>
                    setLoginForm({
                      ...loginForm,
                      loginUsername: e.target.value,
                    })
                  }
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) =>
                    setLoginForm({
                      ...loginForm,
                      loginPassword: e.target.value,
                    })
                  }
                />
                <FaLock className="icon" />
              </div>
            </>
          )}
          {isRegistering && (
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
              />
              <MdEmail className="icon" />
            </div>
          )}
          {isRegistering && (
            <>
              <div className="input-box">
                <input
                  type="username"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, username: e.target.value })
                  }
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                />
                <FaLock className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) =>
                    setSignupForm({
                      ...signupForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <FaLock className="icon" />
              </div>
            </>
          )}
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button
            type="submit"
            onClick={isRegistering ? handleSignup : handleLogin}
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          <div className="register-link">
            <p>
              {!isRegistering
                ? "Don't have an account?"
                : "Already have an account?"}
              <a
                className="register-link-text"
                href="#"
                onClick={(e) => changeRegisterState(e)}
              >
                {isRegistering ? "Login" : "Register"}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
