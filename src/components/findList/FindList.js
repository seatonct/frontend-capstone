import { Link } from "react-router-dom";
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
    getWishListsByUserId(user?.id).then((res) => {
      setLists(res);
    });
  }, [user]);

  const handleSearch = (event) => {
    event.preventDefault();

    findUser();
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSearch}>
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
      {lists.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          {lists.map((list) => {
            return (
              <div className="search-result" key={list.id}>
                <Link className="list-name" to={`/lists/${list.id}`}>
                  {list.name}
                </Link>
                <span className="list-type">Type: {list.type.name} List</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
