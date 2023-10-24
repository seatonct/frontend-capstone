import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getItemById, deleteItem } from "../../services/itemService";
import {
  deleteClaim,
  createClaim,
  getClaimByItemId,
} from "../../services/claimService";
import "./ItemDetails.css";

export const ItemDetails = ({ currentUser }) => {
  const [item, setItem] = useState({});
  const [itemClaimed, setItemClaimed] = useState([]);

  const { itemId } = useParams();
  const navigate = useNavigate();

  const getAndSetItem = () => {
    getItemById(itemId).then((itemObj) => {
      setItem(itemObj);
    });
  };

  useEffect(() => {
    getAndSetItem();
  }, [itemId]);

  useEffect(() => {
    getClaimByItemId(item.id).then((res) => {
      setItemClaimed(res);
    });
  }, [item]);

  return (
    <>
      <h3 className="item-detail-name">{item.name}</h3>
      <div className="item-detail-container">
        {item.imageUrl ? (
          <img src={item.imageUrl} className="item-img" alt={`${item.name}`} />
        ) : (
          ""
        )}
        <div className="item-info-container">
          {item.description ? (
            <div className="item-details">{item.description}</div>
          ) : (
            ""
          )}
          {item.list?.name ? (
            <div className="item-details">
              From <Link to={`/lists/${item.list.id}`}>{item.list.name}</Link>
            </div>
          ) : (
            ""
          )}
          {item.price ? (
            <div className="item-details">Price: {item.price}</div>
          ) : (
            ""
          )}
          {item.storeUrl ? (
            <div className="item-details">
              Buy it online{" "}
              <Link to={item.storeUrl} target="_blank">
                here
              </Link>
              .
            </div>
          ) : (
            ""
          )}
          {/* If the user did not create this list... */}
          {currentUser.id !== item.list?.userId ? (
            <>
              {/* Is the item claimed? */}
              {itemClaimed.length > 0 ? (
                <>
                  {/* If so, did the user claim this item? */}
                  {itemClaimed[0].userId === currentUser.id ? (
                    // If so, display unclaim button.
                    <i
                      className="fa-solid fa-rotate-left claim-icon"
                      onClick={async () => {
                        await deleteClaim(itemClaimed[0]);
                        getAndSetItem();
                      }}
                    ></i>
                  ) : (
                    // If the user did not claim this item, display a lock icon.
                    <i className="fa-solid fa-lock claim-icon"></i>
                  )}
                </>
              ) : (
                // If the item is not claimed, display the claim button.
                <>
                  <i
                    className="fa-solid fa-cart-plus claim-icon"
                    onClick={async () => {
                      const newClaim = {
                        itemId: item.id,
                        listId: parseInt(item.listId),
                        userId: currentUser.id,
                      };

                      await createClaim(newClaim);
                      getAndSetItem();
                    }}
                  ></i>
                </>
              )}
            </>
          ) : (
            // If the user did create this list...
            <>
              {/* Is the list for someone other than the user? */}
              {item.list?.forSelf === false ? (
                <>
                  {/* If so, is the item claimed? */}
                  {itemClaimed.length > 0 ? (
                    <>
                      {/* If so, did the user claim the item? */}
                      {itemClaimed[0].userId === currentUser.id ? (
                        // If so, display the unclaim button.
                        <i
                          className="fa-solid fa-rotate-left claim-icon"
                          onClick={async () => {
                            await deleteClaim(itemClaimed[0]);
                            getAndSetItem();
                          }}
                        ></i>
                      ) : (
                        // If not, display the lock icon.
                        <i className="fa-solid fa-lock claim-icon"></i>
                      )}
                    </>
                  ) : (
                    <>
                      {/* If the item is not claimed, display the claim button. */}
                      <i
                        className="fa-solid fa-cart-plus claim-icon"
                        onClick={async () => {
                          const newClaim = {
                            itemId: item.id,
                            listId: parseInt(item.listId),
                            userId: currentUser.id,
                          };

                          await createClaim(newClaim);
                          getAndSetItem();
                        }}
                      ></i>
                    </>
                  )}
                  <>
                    {/* Display the Edit Item button. */}
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        navigate(`/items/${item.id}/edit`);
                      }}
                    ></i>
                    {/* Display the Delete Item button. */}
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => {
                        deleteItem(item);
                        navigate(`/lists/${item.list.id}`);
                      }}
                    ></i>
                  </>
                </>
              ) : (
                // If the user created this list for themself, don't display Claim, Unclaim, or Lock Icon.
                <>
                  {/* Display the Edit Item button. */}
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      navigate(`/items/${item.id}/edit`);
                    }}
                  ></i>
                  {/* Display the Delete Item Button */}
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => {
                      deleteItem(item);
                      navigate(`/lists/${item.list.id}`);
                    }}
                  ></i>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
