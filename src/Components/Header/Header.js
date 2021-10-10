import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../Assets/logo_white.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./../../App";
import { FaUserCircle } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { signout } from "./../../Firebase/authentication";

const Header = () => {
  const { user } = useContext(userContext);
  const [loggedInUser, setLoggedInUser] = user;

  const handleSignOut = () => {
    signout().then((res) => {
      setLoggedInUser(res);
    });
  };

  return (
    <div className="header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <div className="logo">
              <Link to={"/"}>
                <img className="w-100" src={logo} alt="" />
              </Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ml-auto">
            <Nav className="ms-auto">
              <Nav.Link className="menu">Home</Nav.Link>
              <Nav.Link className="menu">Destination</Nav.Link>
              <Nav.Link className="menu">Blog</Nav.Link>
              <Nav.Link className="menu">Contact</Nav.Link>
              {!loggedInUser.isSigned ? (
                <Nav.Link as={Link} to={"/Auth"} className="menu menu-button">
                  Log in
                </Nav.Link>
              ) : (
                <Nav.Link className="menu logged_user_name">
                  <p>
                    <FaUserCircle className="logged_user_icon" />
                    {loggedInUser.name}{" "}
                    <MdExitToApp
                      onClick={handleSignOut}
                      className="user_sign_out_button"
                    />
                  </p>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
