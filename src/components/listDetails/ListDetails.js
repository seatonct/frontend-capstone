import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListById } from "../../services/wishListService";

export const ListDetails = ({ currentUser }) => {
  const [list, setList] = useState({});

  const { listId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getListById(listId).then((listObj) => {
      setList(listObj);
    });
  }, [listId]);

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
        <h3>List Type: </h3>
      </>
    );
  } else {
    return (
      <>
        <h2>{list.name}</h2>
      </>
    );
  }
};
