import { useEffect, useState } from "react";
import { getAllListTypes, saveNewList } from "../../services/wishListService";
import { useNavigate } from "react-router-dom";
import "./NewList.css";

export const NewList = ({ currentUser }) => {
  const [listTypes, setListTypes] = useState([]);
  const [wishList, setWishList] = useState({
    name: "",
    typeId: 0,
    userId: 0,
    forSelf: false,
  });
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllListTypes().then((typesArray) => {
      setListTypes(typesArray);
    });
  }, []);

  const handleChange = () => {
    setChecked(!checked);
  };

  const updateList = (evt) => {
    const copy = { ...wishList };
    copy[evt.target.id] = evt.target.value;
    copy.userId = currentUser.id;
    setWishList(copy);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const listCopy = { ...wishList };
    listCopy.typeId = parseInt(listCopy.typeId);
    listCopy.forSelf = checked;
    saveNewList(listCopy);
    navigate("/lists/myLists");
  };

  return (
    <form className="form-container" onSubmit={handleSave}>
      <h2>New Wish List</h2>
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
      </div>
      <div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="forSelf"
            value={checked}
            onChange={handleChange}
          />
          This list is for myself.
        </label>
      </div>
      <button type="button submit" className="btn btn-primary btn-lg">
        Create List
      </button>
    </form>
  );
};
