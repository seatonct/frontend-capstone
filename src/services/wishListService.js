export const getAllListTypes = async () => {
  return fetch(`http://localhost:8088/types`).then((res) => res.json());
};

export const saveNewList = async (list) => {
  return fetch(`http://localhost:8088/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  }).then((res) => res.json());
};

export const getWishListsByUserId = async (userId) => {
  return fetch(
    `http://localhost:8088/lists?userId=${userId}&_expand=type`
  ).then((res) => res.json());
};

export const deleteList = async (list) => {
  await fetch(`http://localhost:8088/lists/${list.id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const editList = async (list) => {
  return fetch(`http://localhost:8088/lists/${list.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
};

export const getListById = async (id) => {
  return fetch(`http://localhost:8088/lists/${id}?_expand=type`).then((res) =>
    res.json()
  );
};
