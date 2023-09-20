import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListById } from "../../services/wishListService";
import { deleteItem, getListItems } from "../../services/itemService";
import "./ListDetails.css";

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
      <div className="list-details">
        <header className="list-header">
          <div className="title-div">
            <h2>{list.name}</h2>

            <svg
              onClick={() => {
                navigate(`/lists/${list.id}/edit`);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="title-edit bi bi-pencil-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </div>
          <h5>List Type: {list.type?.name}</h5>
        </header>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            navigate(`/lists/${list.id}/newItem`);
          }}
        >
          Add New Item
        </button>
        <div>
          {listItems.map((item) => {
            return (
              <div className="item-div" key={item.id}>
                <span>{item.name}</span>
                <span>{item.price}</span>
                <svg
                  onClick={() => {
                    navigate(`/items/${item.id}/edit`);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
                <svg
                  onClick={async () => {
                    await deleteItem(item);
                    getAndSetListItems();
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="list-details">
        <header className="list-header">
          <h2>{list.name}</h2>
          <h3>List Type: {list.type?.name}</h3>
        </header>
        <div>
          {listItems.map((item) => {
            return (
              <div className="item-div" key={item.id}>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
