export const createClaim = async (claim) => {
  return fetch(`http://localhost:8088/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(claim),
  });
};

export const getClaimsByUserId = async (userId) => {
  const res = await fetch(`http://localhost:8088/claims?userId=${userId}`);
  return await res.json();
};

// export const getClaimsByItemId = (itemId) => {
//   return fetch(`http://localhost:8088/claims?itemId=${itemId}`).then((res) =>
//     res.json()
//   );
// };

export const deleteClaim = async (claim) => {
  return fetch(`http://localhost:8088/claims/${claim.id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
