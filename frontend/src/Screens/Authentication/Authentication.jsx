import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, fetchUserProfile } from "../../redux/features/auth/authSlice";
import "./Authentication.css";

export default function Authentication() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.status === 'succeeded' && auth.user) {
      navigate('/');
    }
  }, [auth.status, auth.user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              ref={emailRef}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              ref={passwordRef}
              required={true}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
