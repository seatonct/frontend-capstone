import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getItemById,
  deleteItem,
  toggleItemClaimed,
  toggleItemUnclaimed,
} from "../../services/itemService";
import {
  getClaimsByUserId,
  deleteClaim,
  createClaim,
} from "../../services/claimService";
import "./ItemDetails.css";

export const ItemDetails = ({ currentUser }) => {
  const [item, setItem] = useState({});
  const [userClaims, setUserClaims] = useState([]);
  const [user, setUser] = useState({});

  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getItemById(itemId).then((itemObj) => {
      setItem(itemObj);
    });
  }, [itemId]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const getAndSetUserClaims = async () => {
    const claimsArray = await getClaimsByUserId(user.id);
    setUserClaims(claimsArray);
  };

  useEffect(() => {
    getAndSetUserClaims();
  }, [user]);

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
          {item.claimed ? (
            <>
              {userClaims.find((claim) => claim.itemId === item.id) ? (
                <i
                  className="fa-solid fa-rotate-left claim-icon"
                  onClick={async () => {
                    await deleteClaim(
                      userClaims.find((claim) => claim.itemId === item.id)
                    );
                    await toggleItemUnclaimed(item.id);
                    await getAndSetUserClaims();
                  }}
                ></i>
              ) : (
                <i className="fa-solid fa-lock claim-icon"></i>
              )}
            </>
          ) : (
            <>
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
                  getAndSetUserClaims();
                }}
              ></i>
            </>
          )}
          {currentUser.id === item.list?.userId && (
            <>
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => {
                  navigate(`/items/${item.id}/edit`);
                }}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={async () => {
                  await deleteItem(item);
                  navigate(`/lists/${item.list.id}`);
                }}
              ></i>
            </>
          )}
        </div>
      </div>
    </>
  );
};
