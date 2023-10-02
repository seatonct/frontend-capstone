export const getListItems = (list) => {
  return fetch(
    `http://localhost:8088/items?listId=${list.id}&_expand=list`
  ).then((res) => res.json());
};

export const saveNewItem = (item) => {
  return fetch(`http://localhost:8088/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());
};

export const getItemById = (itemId) => {
  return fetch(`http://localhost:8088/items/${itemId}?_expand=list`).then(
    (res) => res.json()
  );
};

export const editItem = (item) => {
  return fetch(`http://localhost:8088/items/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

export const deleteItem = (item) => {
  return fetch(`http://localhost:8088/items/${item.id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const toggleItemClaimed = (itemId) => {
  return fetch(`http://localhost:8088/items/${itemId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      claimed: true,
    }),
  }).then((res) => res.json());
};

export const toggleItemUnclaimed = (itemId) => {
  fetch(`http://localhost:8088/items/${itemId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      claimed: false,
    }),
  }).then((res) => res.json());
};
