import { useEffect, useState } from "react";
import {
  getWishListsByUserId,
  deleteList,
} from "../../services/wishListService";
import { Link } from "react-router-dom";
import "./MyLists.css";

export const MyLists = ({ currentUser }) => {
  // const [user, setUser] = useState({});
  const [myLists, setMyLists] = useState([]);

  // useEffect(() => {
  //   setUser(currentUser);
  // }, [currentUser]);

  const getAndSetMyLists = () => {
    getWishListsByUserId(currentUser.id).then((listsArray) => {
      setMyLists(listsArray);
    });
  };

  useEffect(() => {
    getAndSetMyLists();
  }, [currentUser]);

  return (
    <div className="my-lists">
      <h2>My Wish Lists</h2>
      {myLists.map((listObj) => {
        if (currentUser.id === listObj.userId) {
          return (
            <div key={listObj.id} className="wishList">
              <Link className="list-name" to={`/lists/${listObj.id}`}>
                {listObj.name}
              </Link>
              <span className="list-type">Type: {listObj.type.name} List</span>
              <span className="delete-btn-div">
                <i
                  className="fa-solid fa-trash delete-btn"
                  onClick={() => {
                    deleteList(listObj);
                    getAndSetMyLists();
                  }}
                ></i>
              </span>
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
    </div>
  );
};
