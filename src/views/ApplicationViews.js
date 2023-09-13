import { Route, Routes, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localGiftUser = localStorage.getItem("gift_user");
    const giftUserObj = JSON.parse(localGiftUser);

    setCurrentUser(giftUserObj);
  }, []);

  return <div>Welcome!</div>;
};
