import { Route, Routes, Outlet } from "react-router-dom";
import { Welcome } from "../components/welcome/Welcome";
import { NewList } from "../components/newList/NewList";
import { MyLists } from "../components/myLists/MyLists";
import { EditWishList } from "../components/editList/EditList";
import { ListDetails } from "../components/listDetails/ListDetails";
import { NewItem } from "../components/newItem/NewItem";
import { EditItem } from "../components/editItem/EditItem";
import { FindList } from "../components/findList/FindList";
import { ShoppingList } from "../components/shoppingList/ShoppingList";
import { ItemDetails } from "../components/items/ItemDetails";
import { AuthorizedRoute } from "../components/auth/AuthorizedRoute";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { NavBar } from "../components/nav/NavBar";

export const ApplicationViews = ({ loggedInUser, setLoggedInUser }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <AuthorizedRoute>
              <NavBar currentUser={loggedInUser} />
              <Outlet />
            </AuthorizedRoute>
          }
        >
          <Route index element={<Welcome />} />
          <Route path="lists">
            <Route
              path="newWishList"
              element={<NewList currentUser={loggedInUser} />}
            />
            <Route
              path="myLists"
              element={<MyLists currentUser={loggedInUser} />}
            />
            <Route
              path=":listId"
              element={<ListDetails currentUser={loggedInUser} />}
            />
            <Route
              path=":listId/edit"
              element={<EditWishList currentUser={loggedInUser} />}
            />
            <Route path=":listId/newItem" element={<NewItem />} />
            <Route path="findList" element={<FindList />} />
          </Route>
          <Route path="items">
            <Route
              path=":itemId"
              element={<ItemDetails currentUser={loggedInUser} />}
            />
            <Route path=":itemId/edit" element={<EditItem />} />
          </Route>
          <Route
            path="/shoppingList"
            element={<ShoppingList currentUser={loggedInUser} />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};
