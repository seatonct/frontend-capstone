import { useEffect, useState } from "react";
import {
  getWishListsByUserId,
  deleteList,
} from "../../services/wishListService";

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
      {myLists.map((listObj) => {
        return (
          <div key={listObj.id} className="wishList">
            <span>{listObj.name}</span>
            <span>Type: {listObj.type.name} List</span>
            <button
              onClick={async () => {
                await deleteList(listObj);
                getAndSetMyLists();
              }}
            >
              {" "}
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};
