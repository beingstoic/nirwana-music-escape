import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutCall } from '../../redux/users/userActions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchArea from '../search/SearchArea';
import './header.css';

const Header = ({ userData, logoutCall }) => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (userData.user.userLoggedIn === true) {
      if (userData.user.data.role === "admin") {
        setIsAdmin(true);
        setFirstName(userData.user.data.firstName);
        setLastName(userData.user.data.lastName);
      }
    }
  }, [userData]);

  const handleChange = () => {
    logoutCall();
    navigate("/login");
  };

  return (
    <div className="header">
      {!isAdmin && (<SearchArea />)}
      {firstName && (<h1>Hi, {firstName} {lastName}</h1>)}
      <div className="user-area">
        <a className="aTag">Logout</a>
        <AccountCircleIcon  onClick={handleChange} style={{ color: 'white', transform: 'scale(1.5' }} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutCall: () => dispatch(logoutCall())

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);