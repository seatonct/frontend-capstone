import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar_item">
        <Link className="navbar_link" to="/">
          <i className="fa-solid fa-house"></i>
        </Link>
      </li>
      <li className="navbar_item">
        <Link className="navbar_link" to="/lists/newWishList">
          <i className="fa-solid fa-file-circle-plus"></i>
        </Link>
      </li>
      <li className="navbar_item">
        <Link className="navbar_link" to="/lists/myLists">
          <i className="fa-solid fa-list"></i>
        </Link>
      </li>
      <li className="navbar_item">
        <Link className="navbar_link" to="/lists/findList">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
      </li>
      <li className="navbar_item">
        <Link className="navbar_link" to="/shoppingList">
          <i className="fa-solid fa-cart-shopping"></i>
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
