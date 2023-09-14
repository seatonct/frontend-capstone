export const NewList = () => {
  return (
    <>
      <h1>New Wish List</h1>
      <div class="mb-3">
        <label for="formGroupExampleInput" className="form-label">
          Wish List Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Enter a name for your list"
        ></input>
      </div>
      <div class="mb-3">
        <label for="formGroupExampleInput2" className="form-label">
          Wish List Type:
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </>
  );
};
