import { useEffect, useState } from "react";
import {
  getWishListsByUserId,
  deleteList,
} from "../../services/wishListService";
import { Link } from "react-router-dom";

export const MyLists = ({ currentUser }) => {
  const [myLists, setMyLists] = useState([]);

  const getAndSetMyLists = async () => {
    getWishListsByUserId(currentUser.id).then((listsArray) => {
      setMyLists(listsArray);
    });
  };

  useEffect(() => {
    getAndSetMyLists();
  }, [myLists]);

  return (
    <>
      <h2>My Wish Lists</h2>
      {myLists.map((listObj) => {
        if (currentUser.id === listObj.userId) {
          return (
            <div key={listObj.id} className="wishList">
              <Link to={`/lists/${listObj.id}`}>{listObj.name}</Link>
              <span>Type: {listObj.type.name} List</span>
              <button
                onClick={async () => {
                  await deleteList(listObj);
                  getAndSetMyLists();
                }}
              >
                Delete
              </button>
            </div>
          );
        } else {
          return (
            <div key={listObj.id} className="wishList">
              <Link to={`/lists/${listObj.id}`}>{listObj.name}</Link>
              <span>Type: {listObj.type.name} List</span>
            </div>
          );
        }
      })}
    </>
  );
};
