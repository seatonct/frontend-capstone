import { useEffect, useState } from "react";
import {
  editList,
  getAllListTypes,
  getListById,
} from "../../services/wishListService";
import { useNavigate, useParams } from "react-router-dom";
import "./EditList.css";

export const EditWishList = ({ currentUser }) => {
  const [listTypes, setListTypes] = useState([]);
  const [wishList, setWishList] = useState({});

  const { listId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllListTypes().then((typesArray) => {
      setListTypes(typesArray);
    });
  }, []);

  useEffect(() => {
    getListById(listId).then((listObj) => {
      setWishList(listObj);
    });
  }, [listId]);

  const handleSave = (event) => {
    event.preventDefault();

    const updatedList = {
      id: wishList.id,
      name: wishList.name,
      typeId: wishList.typeId,
      userId: wishList.userId,
    };

    editList(updatedList).then(() => {
      navigate("/lists/myLists");
    });
  };

  return (
    <form className="form-container" onSubmit={handleSave}>
      <h2>Edit Wish List</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Wish List Name:
        </label>
        <input
          name="name"
          value={wishList.name ? wishList.name : ""}
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter a name for your list"
          onChange={(event) => {
            const listCopy = { ...wishList };
            listCopy.name = event.target.value;
            setWishList(listCopy);
          }}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="typeId" className="form-label">
          Wish List Type:
        </label>
        <select
          name="typeId"
          value={wishList.typeId}
          className="form-select"
          aria-label="Default select example"
          id="typeId"
          onChange={(event) => {
            const listCopy = { ...wishList };
            listCopy.typeId = parseInt(event.target.value);
            setWishList(listCopy);
          }}
          required
        >
          <option defaultValue value="0" key="0">
            Choose a Wish List Type ...
          </option>
          {listTypes.map((listTypeObj) => {
            return (
              <option value={listTypeObj.id} key={listTypeObj.id}>
                {listTypeObj.name}
              </option>
            );
          })}
        </select>
        <button type="button submit" className="btn btn-primary btn-lg">
          Save Changes
        </button>
      </div>
    </form>
  );
};
