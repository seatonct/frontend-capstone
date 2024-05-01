import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail, login } from "../../services/userService";
import { loginUser } from "../../services/userService";

export const Login = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [failedLogin, setFailedLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(username, password).then((user) => {
      if (!user) {
        // setFailedLogin(true);
        window.alert("Invalid login");
      } else {
        setLoggedInUser(user);
      }
      navigate("/");
    });
  };

  return (
    <main className="auth-container form-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">Gift Grabber</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="username"
                value={username}
                className="auth-form-input"
                onChange={(evt) => setUsername(evt.target.value)}
                placeholder="Username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="password"
                value={password}
                className="auth-form-input"
                onChange={(evt) => setPassword(evt.target.value)}
                placeholder="Password"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
