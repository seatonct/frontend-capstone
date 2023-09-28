export const getClaimedItemsByUserId = (currentUser) => {
  return fetch(
    `http://localhost:8088/claims?userId=${currentUser.id}&_expand=item&_expand=list`
  ).then((res) => res.json());
};
