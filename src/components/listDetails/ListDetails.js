import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getListById } from "../../services/wishListService";
import { deleteItem, getListItems } from "../../services/itemService";
import "./ListDetails.css";
import {
  createClaim,
  getAllClaims,
  getClaimsByUserId,
  deleteClaim,
} from "../../services/claimService";

export const ListDetails = ({ currentUser }) => {
  const [list, setList] = useState({});
  const [listItems, setListItems] = useState([]);
  const [allClaims, setAllClaims] = useState([]);
  const [userClaims, setUserClaims] = useState([]);

  const { listId } = useParams();
  const navigate = useNavigate();

  const getAndSetListItems = async () => {
    const listObj = await getListById(listId);
    setList(listObj);
  };

  const getAndSetAllClaims = async () => {
    const claimsArray = await getAllClaims();
    setAllClaims(claimsArray);
  };

  const getAndSetUserClaims = async () => {
    const res = await getClaimsByUserId(currentUser.id);
    setUserClaims(res);
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
    getAndSetAllClaims();
  }, [list]);

  useEffect(() => {
    getAndSetUserClaims();
  }, [listItems]);

  // If the list was created by the user...
  if (currentUser.id === list.userId) {
    return (
      // Display list name with Edit List button.
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
        {/* Display list type. */}
        <h3>List Type: {list.type?.name}</h3>
        {/* Display Add New Item button. */}
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
          {/* Display each item in the list. */}
          {listItems.map((item) => {
            return (
              <div className="item-div" key={item.id}>
                <div className="item-name">
                  <Link to={`/items/${item.id}`}>{item.name}</Link>
                </div>
                <div className="icons-container">
                  {/* If the user created the list for someone other than themself... */}
                  {list.forSelf === false ? (
                    <>
                      {/* Is the item claimed? */}
                      {allClaims.find((obj) => obj.itemId === item.id) ? (
                        <div className="claim-icon-div">
                          {/* If so, did the user claim the item? */}
                          {userClaims?.find(
                            (claim) => claim.itemId === item.id
                          ) ? (
                            // If so, display the Unclaim button.
                            <i
                              className="fa-solid fa-rotate-left claim-icon"
                              onClick={async () => {
                                await deleteClaim(
                                  userClaims.find(
                                    (claim) => claim.itemId === item.id
                                  )
                                );
                                await getAndSetAllClaims();
                                await getAndSetUserClaims();
                                await getAndSetListItems();
                              }}
                            ></i>
                          ) : (
                            // If the item is claimed by another user, display the lock icon.
                            <i className="fa-solid fa-lock claim-icon"></i>
                          )}
                        </div>
                      ) : (
                        // If the item is not claimed display the Claim button.
                        <div className="claim-icon-div">
                          <i
                            className="fa-solid fa-cart-plus claim-icon"
                            onClick={async () => {
                              const newClaim = {
                                itemId: item.id,
                                listId: parseInt(item.listId),
                                userId: currentUser.id,
                              };

                              await createClaim(newClaim);
                              await getAndSetAllClaims();
                              await getAndSetUserClaims();
                              await getAndSetListItems();
                            }}
                          ></i>
                        </div>
                      )}
                    </>
                  ) : (
                    // If the user created the list for themself, don't display Claim buttons.
                    ""
                  )}
                  {/* Display Edit Item button. */}
                  <div className="edit-icon-div">
                    <i
                      className="fa-solid fa-pen-to-square edit-icon"
                      onClick={() => {
                        navigate(`/items/${item.id}/edit`);
                      }}
                    ></i>
                  </div>
                  {/* Display Delete Item button. */}
                  <div className="delete-icon-div">
                    <i
                      className="fa-solid fa-trash delete-icon"
                      onClick={async () => {
                        deleteItem(item);
                        await getAndSetListItems();
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
    // If the user did not create the list.
    return (
      // Display list name and list type.
      <div className="list-details">
        <header className="list-header">
          <h2>{list.name}</h2>
          <h3 className="list-type-header">List Type: {list.type?.name}</h3>
        </header>
        <div className="item-container">
          {/* Display each item in the list. */}
          {listItems.map((item) => {
            return (
              <div className="item-div" key={item.id}>
                <Link to={`/items/${item.id}`} className="item-name-viewer">
                  {item.name}
                </Link>
                {/* Is the item claimed? */}
                {allClaims.find((obj) => obj.itemId === item.id) ? (
                  <div className="claim-icon">
                    {/* If so, did the user claim the item? */}
                    {userClaims.find((claim) => claim.itemId === item.id) ? (
                      // If so, display the Unclaim button.
                      <>
                        <i
                          className="fa-solid fa-rotate-left claim-icon"
                          onClick={async () => {
                            await deleteClaim(
                              userClaims.find(
                                (claim) => claim.itemId === item.id
                              )
                            );
                            await getAndSetAllClaims();
                            await getAndSetUserClaims();
                            await getAndSetListItems();
                          }}
                        ></i>
                      </>
                    ) : (
                      // If the item is claimed by another user, display the lock icon.
                      <i className="fa-solid fa-lock"></i>
                    )}
                  </div>
                ) : (
                  // If the item is not claimed, display the Claim button.
                  <div className="claim-icon">
                    <i
                      className="fa-solid fa-cart-plus claim-icon"
                      onClick={async () => {
                        const newClaim = {
                          itemId: item.id,
                          listId: parseInt(item.listId),
                          userId: currentUser.id,
                        };

                        await createClaim(newClaim);
                        await getAndSetAllClaims();
                        await getAndSetUserClaims();
                        await getAndSetListItems();
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
