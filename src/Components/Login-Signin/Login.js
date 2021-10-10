import React from "react";
import "./Login.css";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../../Firebase/authentication";
import { createUser } from "../../Firebase/authentication";
import { userContext } from "../../App";
import { Col, Row, Container } from "react-bootstrap";

// firebaseApp();

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const { user } = useContext(userContext);

  const [loggedInUser, setLoggedInUser] = user;
  const [newUser, setNewUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isSigned: false,
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const redirect = (res) => {
    setUserInfo(res);
    setLoggedInUser(res);
    if (res.isSigned) {
      history.replace(from);
    }
  };

  const toggleNewUser = () => {
    setNewUser(!newUser);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Create new user
    if (newUser) {
      createUser(userInfo.name, userInfo.email, userInfo.password).then(
        (res) => {
          redirect(res);
        }
      );
    }
    // User login
    if (!newUser) {
      loginUser(userInfo.email, userInfo.password).then((res) => {
        redirect(res);
      });
    }
  };

  const handleOnBlur = (e) => {
    let isValid = false;

    if (newUser) {
      if (e.target.name === "name") {
        isValid = true;
      }
    }

    if (e.target.name === "email") {
      const re = /\S+@\S+\.\S+/;
      isValid = re.test(e.target.value);
    }

    if (e.target.name === "password") {
      isValid = e.target.value.length >= 6;
    }

    if (isValid) {
      let newUser = { ...userInfo };
      newUser[e.target.name] = e.target.value;
      setUserInfo(newUser);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col lg={6} className="mx-auto">
            <div className="main login">
              <p className="sign" align="center">
                {newUser ? <span>Sign Up</span> : <span>Log In</span>}
              </p>
              <form onSubmit={handleOnSubmit} className="form1">
                {newUser ? (
                  <input
                    onBlur={handleOnBlur}
                    className="un "
                    type="text"
                    align="center"
                    placeholder="User Name"
                    name="name"
                    required
                  />
                ) : (
                  ""
                )}
                <input
                  onBlur={handleOnBlur}
                  className="un "
                  type="text"
                  align="center"
                  placeholder="User Email"
                  name="email"
                  required
                />
                <input
                  onBlur={handleOnBlur}
                  className="pass"
                  type="password"
                  align="center"
                  placeholder="Password"
                  name="password"
                  required
                />
                <br />
                {newUser ? (
                  <button type="submit" className=" submit" align="center">
                    Sign in
                  </button>
                ) : (
                  <button type="submit" className=" submit" align="center">
                    Log in
                  </button>
                )}

                <p>{loggedInUser.message}</p>

                <div className="register">
                  {newUser ? (
                    <p>
                      Already a member?{" "}
                      <span
                        onClick={toggleNewUser}
                        style={{ color: "var(--yellow)" }}
                      >
                        Login
                      </span>{" "}
                    </p>
                  ) : (
                    <p>
                      Not a member?{" "}
                      <span
                        onClick={toggleNewUser}
                        style={{ color: "var(--yellow)" }}
                      >
                        Sign Up
                      </span>{" "}
                    </p>
                  )}
                  {/* Already a mebmer?{" "}
                  <Link to={`/login`} style={{ textDecoration: "none" }}>
                    <span> Log In </span>
                  </Link>{" "} */}
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
