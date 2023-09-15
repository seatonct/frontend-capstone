export const getAllListTypes = async () => {
  return fetch(`http://localhost:8088/listTypes`).then((res) => res.json());
};

export const saveNewList = (list) => {
  return fetch(`http://localhost:8088/wishLists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  }).then((res) => res.json());
};
