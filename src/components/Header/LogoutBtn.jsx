import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = new useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="inline-block px-6 py duration-200 hover:bg-blue-300 rounded-full">
      LogoutBtn
    </div>
  );
}

export default LogoutBtn;
