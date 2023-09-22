import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListById } from "../../services/wishListService";
import {
  deleteItem,
  getListItems,
  toggleItemClaimed,
  toggleItemUnclaimed,
} from "../../services/itemService";
import "./ListDetails.css";
import {
  createClaim,
  getClaimsByUserId,
  deleteClaim,
} from "../../services/claimService";

export const ListDetails = ({ currentUser }) => {
  const [list, setList] = useState({});
  const [listItems, setListItems] = useState([]);
  const [userClaims, setUserClaims] = useState([]);

  const { listId } = useParams();
  const navigate = useNavigate();

  const getAndSetListItems = () => {
    getListById(listId).then((listObj) => {
      setList(listObj);
    });
  };

  const getAndSetUserClaims = () => {
    getClaimsByUserId(currentUser.id).then((claimsArray) => {
      setUserClaims(claimsArray);
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

  useEffect(() => {
    getAndSetUserClaims();
  }, []);

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
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price}</span>
                {item.claimed ? (
                  <div className="claimed-icon">
                    Claimed
                    {userClaims.find((claim) => claim.itemId === item.id) ? (
                      <>
                        <span> by you</span>
                        <span>
                          <svg
                            onClick={() => {
                              deleteClaim(
                                userClaims.find(
                                  (claim) => claim.itemId === item.id
                                )
                              ).then(() => {
                                toggleItemUnclaimed(item.id);
                              });
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-counterclockwise"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                            />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                          </svg>
                        </span>
                      </>
                    ) : (
                      <> by </>
                    )}
                  </div>
                ) : (
                  <div className="claim-icon">
                    <svg
                      onClick={() => {
                        const newClaim = {
                          itemId: item.id,
                          userId: currentUser.id,
                        };

                        createClaim(newClaim).then(() => {
                          toggleItemClaimed(item.id);
                        });
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-bag-plus-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
                      />
                    </svg>
                  </div>
                )}

                <div className="edit-icon">
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
                </div>
                <div className="delete-icon">
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
                <span className="item-name-viewer">{item.name}</span>
                <span className="item-price-viewer">{item.price}</span>
                <div className="claim-icon-viewer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bag-plus-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
