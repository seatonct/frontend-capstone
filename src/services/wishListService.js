export const getAllListTypes = () => {
  return fetch(`http://localhost:8088/types`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const saveNewList = (list) => {
  return fetch(`http://localhost:8088/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const getWishListsByUserId = async (userId) => {
  return fetch(`http://localhost:8088/lists?userId=${userId}&_expand=type`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const deleteList = (list) => {
  fetch(`http://localhost:8088/lists/${list.id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const editList = (list) => {
  return fetch(`http://localhost:8088/lists/${list.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  }).catch((error) => {
    console.error(error);
    alert("Failed to retrieve data. Please try again later.");
  });
};

export const getListById = (id) => {
  return fetch(`http://localhost:8088/lists/${id}?_expand=type`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};
