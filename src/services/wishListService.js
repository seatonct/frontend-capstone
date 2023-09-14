export const getAllListTypes = async () => {
  return fetch(`http://localhost:8088/listTypes`).then((res) => res.json());
};
