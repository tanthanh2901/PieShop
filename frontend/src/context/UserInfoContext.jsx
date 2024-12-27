import React, { createContext, useState, useEffect } from 'react';
import { getUserInfoApi } from '../api/UserApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login, logout } from '../api/AuthorizationApi';

export const UserInfoContext = createContext();

const UserInfoContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();

  // Initialize token and user info on app load
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await getUserInfoApi();
      if (res.status >= 200 && res.status < 300) {
        setUserInfo(res.data);
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      handleLogout(); // Clear session if token is invalid
    }
  };

  const handleLogin = async (loginData) => {
    try {
      const res = await login(loginData);
      if (res.status === 200) {
        const jwt = res.data.accessToken;
        localStorage.setItem("jwt", jwt); // Persist token
        setToken(jwt); // Update token state
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        navigate("/"); // Redirect after successful login
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"]; // Remove token from Axios
    setToken(""); // Clear token state
    setUserInfo(null); // Clear user info
    navigate("/"); // Redirect to home or login page
    logout();
  };

  const isLoggedIn = !!token;
  const roles = userInfo?.roles?.map((role) => role.toLowerCase()) || [];

  const isAdmin = roles.includes('admin');

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        roles,
        isLoggedIn,
        handleLogin,
        handleLogout,
        isAdmin,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;
