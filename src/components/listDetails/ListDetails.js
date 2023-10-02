import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [user, setUser] = useState({});

  const { listId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const getAndSetListItems = () => {
    getListById(listId).then((listObj) => {
      setList(listObj);
    });
  };

  const getAndSetUserClaims = () => {
    getClaimsByUserId(user.id).then((res) => setUserClaims(res));
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
  }, [listItems]);

  if (user.id === list.userId) {
    return (
      <div className="list-details">
        <h2>
          {list.name}{" "}
          <i
            className="fa-solid fa-pen-to-square edit-list-icon"
            onClick={() => {
              navigate(`/lists/${list.id}/edit`);
            }}
          ></i>
        </h2>
        <h3>List Type: {list.type?.name}</h3>
        <div className="btn-div">
          <button
            type="button"
            className="btn btn-primary btn-sm add-btn"
            onClick={() => {
              navigate(`/lists/${list.id}/newItem`);
            }}
          >
            Add New Item
          </button>
        </div>
        <div>
          {listItems.map((item) => {
            return (
              <div className="item-div" key={item.id}>
                <div className="item-name">
                  <Link to={`/items/${item.id}`}>{item.name}</Link>
                </div>
                <div className="icons-container">
                  {list.forSelf === false ? (
                    <>
                      {item.claimed ? (
                        <div className="claim-icon-div">
                          {userClaims.find(
                            (claim) => claim.itemId === item.id
                          ) ? (
                            <i
                              className="fa-solid fa-rotate-left claim-icon"
                              onClick={async () => {
                                await deleteClaim(
                                  userClaims.find(
                                    (claim) => claim.itemId === item.id
                                  )
                                );
                                await toggleItemUnclaimed(item.id);
                                await getAndSetUserClaims();
                                getAndSetListItems();
                              }}
                            ></i>
                          ) : (
                            <i className="fa-solid fa-lock claim-icon"></i>
                          )}
                        </div>
                      ) : (
                        <div className="claim-icon-div">
                          <i
                            className="fa-solid fa-cart-plus claim-icon"
                            onClick={async () => {
                              const newClaim = {
                                itemId: item.id,
                                listId: parseInt(item.listId),
                                userId: user.id,
                              };

                              await createClaim(newClaim);
                              await toggleItemClaimed(item.id);
                              await getAndSetUserClaims();
                              getAndSetListItems();
                            }}
                          ></i>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  <div className="edit-icon-div">
                    <i
                      className="fa-solid fa-pen-to-square edit-icon"
                      onClick={() => {
                        navigate(`/items/${item.id}/edit`);
                      }}
                    ></i>
                  </div>
                  <div className="delete-icon-div">
                    <i
                      className="fa-solid fa-trash delete-icon"
                      onClick={async () => {
                        await deleteItem(item);
                        getAndSetListItems();
                      }}
                    ></i>
                  </div>
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
          <h3 className="list-type-header">List Type: {list.type?.name}</h3>
        </header>
        <div className="item-container">
          {listItems.map((item) => {
            return (
              <div className="item-div" key={item.id}>
                <Link to={`/items/${item.id}`} className="item-name-viewer">
                  {item.name}
                </Link>
                {item.claimed ? (
                  <div className="claim-icon">
                    {userClaims.find((claim) => claim.itemId === item.id) ? (
                      <>
                        <i
                          className="fa-solid fa-rotate-left claim-icon"
                          onClick={async () => {
                            await deleteClaim(
                              userClaims.find(
                                (claim) => claim.itemId === item.id
                              )
                            );
                            await toggleItemUnclaimed(item.id);
                            await getAndSetUserClaims();
                            getAndSetListItems();
                          }}
                        ></i>
                      </>
                    ) : (
                      <i className="fa-solid fa-lock"></i>
                    )}
                  </div>
                ) : (
                  <div className="claim-icon">
                    <i
                      className="fa-solid fa-cart-plus claim-icon"
                      onClick={async () => {
                        const newClaim = {
                          itemId: item.id,
                          listId: parseInt(item.listId),
                          userId: user.id,
                        };

                        await createClaim(newClaim);
                        await toggleItemClaimed(item.id);
                        getAndSetUserClaims().then(() => {
                          getAndSetListItems();
                        });
                      }}
                    ></i>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
