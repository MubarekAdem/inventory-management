import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { signIn, signUp } from "../services/api";
import "../styles/Authform.css"; // Import signUp and signIn API services

function AuthForm({ onAuthSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email))
      errors.email = "Invalid email address";
    if (!password || password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (isSignUp && password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      let response;
      if (isSignUp) {
        response = await signUp(
          firstName,
          lastName,
          email,
          password,
          phoneNumber
        );
        setMessage("Sign-up successful!");
        navigate("/signin");
      } else {
        response = await signIn(email, password);
        localStorage.setItem("token", response.token); // Store token here
        onAuthSuccess(response.token);
        navigate("/items");
      }
    } catch (error) {
      setMessage(
        `Error ${isSignUp ? "signing up" : "signing in"}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div class="auth-container">
      <div class="auth-form">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

        <form onSubmit={handleSubmit} class="form-space">
          {isSignUp && (
            <>
              <div class="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                {errors.firstName && <p class="error">{errors.firstName}</p>}
              </div>
              <div class="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {errors.lastName && <p class="error">{errors.lastName}</p>}
              </div>
              <div class="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                {errors.phoneNumber && (
                  <p class="error">{errors.phoneNumber}</p>
                )}
              </div>
            </>
          )}

          <div class="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p class="error">{errors.email}</p>}
          </div>

          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p class="error">{errors.password}</p>}
          </div>

          {isSignUp && (
            <div class="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && (
                <p class="error">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button type="submit" class="submit-btn">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p class="toggle-auth">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            class="toggle-btn"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        {message && <p class="message">{message}</p>}
      </div>
    </div>
  );
}

export default AuthForm;
