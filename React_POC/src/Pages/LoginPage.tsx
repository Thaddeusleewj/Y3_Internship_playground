import React, { FormEvent, useState } from "react";

// Importing dependencies
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Importing stylesheet
import "./css/Login.css";
import "react-toastify/dist/ReactToastify.css";

// Importing Icons
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginPage = () => {
  // Decare state variables
  const [isRegistering, setIsRegistering] = useState(false);

  // States of form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States of login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  // Changing register state
  const changeRegisterState = (e: any) => {
    e.preventDefault();
    setIsRegistering(!isRegistering);
  };

  const handleCredentials = (e: FormEvent) => {
    e.preventDefault();

    if (isRegistering) {
      // Ensure that passwords match
      if (password !== confirmPassword) {
        console.log("Passwords dont match");
        return;
      } else {
        console.log("Registering with email", email, "and password", password);
        // Call the signup function
        handleSignup(e);
      }
    } else {
      console.log("Logging in with email", email, "and password", password);
      // Call the login function
      handleLogin(e);
    }
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    // Call the createUserWithEmailAndPassword function
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Sign in
        const user = userCredentials.user;
        toast.success("User registered successfully");
        console.log("user", user);
        setIsRegistering(false);
        navigate("/");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        toast.error(errorMessage);
        console.log("error", errorCode, errorMessage);
      });
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    // Call the signInWithEmailAndPassword function
    console.log(loginEmail, loginPassword);
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredentials) => {
        // Signed in
        const user = userCredentials.user;
        toast.success("User logged in successfully");
        navigate("/home");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        toast.error(errorMessage);
        console.log("error", errorCode, errorMessage);
      });
  };

  return (
    <div className="loginBody">
      <ToastContainer />
      <div className="wrapper">
        <form onSubmit={handleCredentials}>
          <h1>{isRegistering ? "Register" : "Login"}</h1>
          {!isRegistering && (
            <>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdEmail className="icon" />
            </div>
          )}

          {isRegistering && (
            <>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

          <button type="submit">{isRegistering ? "Register" : "Login"}</button>

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
