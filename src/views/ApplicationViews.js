import { Route, Routes, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Welcome } from "../components/welcome/Welcome";
import { NewList } from "../components/newList/NewList";
import { MyLists } from "../components/myLists/MyLists";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localGiftUser = localStorage.getItem("gift_user");
    const giftUserObj = JSON.parse(localGiftUser);

    setCurrentUser(giftUserObj);
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<Welcome />} />
          <Route
            path="/newWishList"
            element={<NewList currentUser={currentUser} />}
          />
          <Route
            path="/myLists"
            element={<MyLists currentUser={currentUser} />}
          />
        </Route>
      </Routes>
    </>
  );
};
