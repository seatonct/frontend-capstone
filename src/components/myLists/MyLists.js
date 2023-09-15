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
  }, []);

  const handleDelete = () => {};

  return (
    <>
      {myLists.map((listObj) => {
        return (
          <div className="wishList">
            <span listId={listObj.id}>{listObj.name}</span>
            <span>Type: {listObj.type.name} List</span>
            <button
              listId={listObj.id}
              onClick={async () => {
                await deleteList(listObj);
                getAndSetMyLists();
              }}
            >
              Delete List
            </button>
          </div>
        );
      })}
    </>
  );
};
