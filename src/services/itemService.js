export const getListItems = (list) => {
  return fetch(`http://localhost:8088/items?listId=${list.id}&_expand=list`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const saveNewItem = (item) => {
  return fetch(`http://localhost:8088/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const getItemById = (itemId) => {
  return fetch(`http://localhost:8088/items/${itemId}?_expand=list`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const editItem = (item) => {
  return fetch(`http://localhost:8088/items/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).catch((error) => {
    console.error(error);
    alert("Failed to retrieve data. Please try again later.");
  });
};

export const deleteItem = (item) => {
  fetch(`http://localhost:8088/items/${item.id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};
