import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/userService";
import "./NavBar.css";

export const NavBar = ({ loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      {loggedInUser ? (
        <>
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
          <li>
            <Link
              className="navbar_link"
              to=""
              onClick={(e) => {
                e.preventDefault();
                // setOpen(false);
                logout()
                  .then(() => {
                    setLoggedInUser(null);
                    // setOpen(false);
                  })
                  .then(() => {
                    navigate("/login");
                  });
              }}
            >
              Logout
            </Link>
          </li>
        </>
      ) : (
        ""
      )}
    </ul>
  );
};
