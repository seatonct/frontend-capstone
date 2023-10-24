import { useEffect, useState } from "react";
import { getClaimedItemsByUserId } from "../../services/shoppingListService.js";
import { deleteClaim } from "../../services/claimService.js";
import "./ShoppingList.css";
import { Link } from "react-router-dom";

export const ShoppingList = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const getAndSetItems = async () => {
    const res = await getClaimedItemsByUserId(user);
    setItems(res);
  };

  useEffect(() => {
    if ("id" in user) {
      getAndSetItems();
    }
  }, [user]);

  return (
    <>
      <h2>Shopping List</h2>
      {/* Display each item the user has claimed. */}
      {items.map((item) => {
        return (
          // Link each item's name to its details page.
          <div className="item-div" key={item.item.id}>
            <Link to={`/items/${item.item.id}`} className="item-name">
              {item.item.name}
            </Link>
            {/* Display the Unclaim button. */}
            <i
              className="fa-solid fa-arrow-rotate-left"
              onClick={async () => {
                await deleteClaim(item);
                await getAndSetItems();
              }}
            ></i>
            {/* Display the name of the list from which the item comes as a link to that list. */}
            <span className="item-list">
              From <Link to={`/lists/${item.list.id}`}>{item.list.name}</Link>
            </span>
          </div>
        );
      })}
    </>
  );
};
