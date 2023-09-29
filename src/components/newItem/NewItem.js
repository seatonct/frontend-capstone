import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { saveNewItem } from "../../services/itemService";
import "./NewItem.css";

export const NewItem = () => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    storeUrl: "",
    listId: 0,
    claimed: false,
  });

  const { listId } = useParams();
  const navigate = useNavigate();

  const updateItem = (event) => {
    const copy = { ...item };
    copy[event.target.id] = event.target.value;
    copy.listId = listId;
    setItem(copy);
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveNewItem(item);
    navigate(`/lists/${listId}`);
  };

  return (
    <form className="form-container" onSubmit={handleSave}>
      <h2>New Item</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Item Name:
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Enter a name for the item"
          onChange={updateItem}
          required
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          placeholder="Enter a description of the item"
          onChange={updateItem}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price:
        </label>
        <input
          id="price"
          type="text"
          className="form-control"
          placeholder="Example: $1000.00"
          onChange={updateItem}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">
          Image URL:
        </label>
        <input
          id="imageUrl"
          type="text"
          className="form-control"
          placeholder="Example: http://www.imageurl.com/image"
          onChange={updateItem}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="storeUrl" className="form-label">
          Online Store URL:
        </label>
        <input
          id="storeUrl"
          type="text"
          className="form-control"
          placeholder="Example: http://www.amazon.com/product"
          onChange={updateItem}
        ></input>
      </div>
      <button type="button submit" className="btn btn-primary btn-lg">
        Add Item
      </button>
    </form>
  );
};
