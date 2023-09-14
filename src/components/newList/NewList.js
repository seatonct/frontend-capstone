import { useEffect, useState } from "react";
import { getAllListTypes } from "../../services/wishListService";

export const NewList = () => {
  const currentUser = localStorage.getItem("gift_user");
  const idNum = currentUser.id;
  const [listTypes, setListTypes] = useState([]);
  const [wishList, setWishList] = useState({
    name: "",
    typeId: 0,
    creatorId: idNum,
  });

  useEffect(() => {
    getAllListTypes().then((typesArray) => {
      setListTypes(typesArray);
    });
  }, []);

  const updateList = (evt) => {
    const copy = { ...wishList };
    copy[evt.target.id] = evt.target.value;
    setWishList(copy);
  };

  return (
    <>
      <h1>New Wish List</h1>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Wish List Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter a name for your list"
          onChange={updateList}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">
          Wish List Type:
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          id="typeId"
          onChange={updateList}
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
        <button type="button" className="btn btn-primary btn-lg">
          Create List
        </button>
      </div>
    </>
  );
};
