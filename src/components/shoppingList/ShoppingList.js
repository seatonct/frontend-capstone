import { useEffect, useState } from "react";
import { getClaimedItemsByUserId } from "../../services/shoppingListService.js";
import { deleteClaim } from "../../services/claimService.js";
import { toggleItemUnclaimed } from "../../services/itemService.js";
import "./ShoppingList.css";
import { Link } from "react-router-dom";

export const ShoppingList = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const getAndSetItems = () => {
    getClaimedItemsByUserId(user).then((res) => {
      setItems(res);
    });
  };

  useEffect(() => {
    getAndSetItems();
  }, [user]);

  return (
    <>
      <h2>Shopping List</h2>
      {items.map((item) => {
        return (
          <div className="item-div" key={item.item.id}>
            <span className="item-name">{item.item.name}</span>
            <span className="item-price">{item.item.price}</span>
            <span className="item-list">
              From <Link to={`/lists/${item.list.id}`}>{item.list.name}</Link>
            </span>
            <span>
              Undo Claim{" "}
              <i
                className="fa-solid fa-arrow-rotate-left"
                onClick={async () => {
                  await deleteClaim(item);
                  await toggleItemUnclaimed(item.itemId);
                  getAndSetItems();
                }}
              ></i>
            </span>
          </div>
        );
      })}
    </>
  );
};
