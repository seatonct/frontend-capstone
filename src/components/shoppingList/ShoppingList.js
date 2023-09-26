import { useEffect, useState } from "react";
import { getClaimedItemsByUserId } from "../../services/shoppingListService.js";

export const ShoppingList = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    getClaimedItemsByUserId(user).then((res) => {
      setItems(res);
    });
  }, [user]);

  return (
    <>
      <h2>Shopping List</h2>
      {items.map((item) => {
        return (
          <div className="item-div" key={item.item.id}>
            <span className="item-name">{item.item.name}</span>
            <span className="item-price">{item.item.price}</span>
          </div>
        );
      })}
    </>
  );
};
