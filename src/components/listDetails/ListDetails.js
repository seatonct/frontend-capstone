import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListById } from "../../services/wishListService";
import { deleteItem, getListItems } from "../../services/itemService";

export const ListDetails = ({ currentUser }) => {
  const [list, setList] = useState({});
  const [listItems, setListItems] = useState([]);

  const { listId } = useParams();
  const navigate = useNavigate();

  const getAndSetListItems = () => {
    getListById(listId).then((listObj) => {
      setList(listObj);
    });
  };

  useEffect(() => {
    getAndSetListItems();
  }, [listId]);

  useEffect(() => {
    getListItems(list).then((itemsArray) => {
      setListItems(itemsArray);
    });
  }, [list]);

  if (currentUser.id === list.userId) {
    return (
      <>
        <h2>
          <span>{list.name}</span>
          <button
            onClick={() => {
              navigate(`/lists/${list.id}/edit`);
            }}
          >
            Edit
          </button>
        </h2>
        <h3>List Type: {list.type?.name}</h3>
        <button
          onClick={() => {
            navigate(`/lists/${list.id}/newItem`);
          }}
        >
          Add New Item
        </button>
        <div>
          {listItems.map((item) => {
            return (
              <div key={item.id}>
                {item.name}
                <button
                  onClick={() => {
                    navigate(`/items/${item.id}/edit`);
                  }}
                >
                  Edit Item
                </button>
                <button
                  onClick={async () => {
                    await deleteItem(item);
                    getAndSetListItems();
                  }}
                >
                  Delete Item
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>{list.name}</h2>
        <h3>List Type: {list.type?.name}</h3>
        <div>
          {listItems.map((item) => {
            return <div key={item.id}>{item.name}</div>;
          })}
        </div>
      </>
    );
  }
};
