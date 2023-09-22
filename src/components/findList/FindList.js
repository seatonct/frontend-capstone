import { getUserByEmail } from "../../services/userService";
import { getWishListsByUserId } from "../../services/wishListService";
import "./FindList.css";
import { useEffect, useState } from "react";

export const FindList = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);

  const findUser = () => {
    getUserByEmail(email).then((res) => {
      setUser(res[0]);
    });
  };

  useEffect(() => {
    getWishListsByUserId(user.id).then((res) => {
      setLists(res);
    });
  }, [user]);

  return (
    <>
      <form className="form-container" onSubmit={findUser}>
        <div className="mb-3">
          <h2>Find a List</h2>
          <label htmlFor="formGroupExampleInput" className="form-label">
            List Creator's Email Address
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Example: user@email.com"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <button type="button submit" className="btn btn-primary btn-lg">
            Search
          </button>
        </div>
      </form>
    </>
  );
};
