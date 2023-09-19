import { Route, Routes, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Welcome } from "../components/welcome/Welcome";
import { NewList } from "../components/newList/NewList";
import { MyLists } from "../components/myLists/MyLists";
import { NavBar } from "../components/nav/NavBar";
import { EditWishList } from "../components/editList/EditList";
import { ListDetails } from "../components/listDetails/ListDetails";
import { NewItem } from "../components/newItem/NewItem";

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
              <NavBar />
              <Outlet />
            </>
          }
        >
          <Route index element={<Welcome />} />
          <Route path="lists">
            <Route
              path="newWishList"
              element={<NewList currentUser={currentUser} />}
            />
            <Route
              path="myLists"
              element={<MyLists currentUser={currentUser} />}
            />
            <Route
              path=":listId"
              element={<ListDetails currentUser={currentUser} />}
            />
            <Route
              path=":listId/edit"
              element={<EditWishList currentUser={currentUser} />}
            />
            <Route path=":listId/newItem" element={<NewItem />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
