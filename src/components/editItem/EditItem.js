import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editItem, getItemById } from "../../services/itemService";

export const EditItem = () => {
  const [item, setItem] = useState({});

  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getItemById(parseInt(itemId)).then((itemObj) => {
      setItem(itemObj);
    });
  }, [itemId]);

  const updateItem = (event) => {
    const copy = { ...item };
    copy[event.target.id] = event.target.value;
    setItem(copy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedItem = {
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      storeUrl: item.storeUrl,
      listId: item.listId,
      claimed: item.claimed,
      id: item.id,
    };

    editItem(updatedItem).then(() => {
      navigate(`/lists/${item.listId}`);
    });
  };

  return (
    <form className="form-container" onSubmit={handleSave}>
      <h2>Edit Item</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Item Name:
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          value={item.name ? item.name : ""}
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
          value={item.description ? item.description : ""}
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
          value={item.price ? item.price : ""}
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
          value={item.imageUrl ? item.imageUrl : ""}
          className="form-control"
          placeholder="Example: http://www.imageurl.com/image"
          onChange={updateItem}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="storeUrl" className="form-label">
          Product in Online Store URL:
        </label>
        <input
          id="storeUrl"
          type="text"
          value={item.storeUrl ? item.storeUrl : ""}
          className="form-control"
          placeholder="Example: http://www.amazon.com/product"
          onChange={updateItem}
        ></input>
      </div>
      <button type="button submit" className="btn btn-primary btn-lg">
        Save Changes
      </button>
    </form>
  );
};
