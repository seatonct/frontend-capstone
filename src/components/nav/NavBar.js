import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar_item">
        <Link className="navbar_link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar_item">
        <Link className="navbar_link" to="/lists/newWishList">
          New Wish List
        </Link>
      </li>
      <li className="navbar_item">
        <Link className="navbar_link" to="/lists/myLists">
          My Wish Lists
        </Link>
      </li>
      <li className="navbar_item">
        <Link className="navbar_link" to="/lists/findList">
          Find Wish List
        </Link>
      </li>
      <li className="navbar_item">
        <Link className="navbar_link" to="/shoppingList">
          ShoppingList
        </Link>
      </li>
      {localStorage.getItem("gift_user") ? (
        <li className="navbar_item navbar-logout">
          <Link
            className="navbar_link"
            to=""
            onClick={() => {
              localStorage.removeItem("gift_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
