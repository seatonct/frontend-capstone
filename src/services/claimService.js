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
  return fetch(`http://localhost:8088/claims?userId=${userId}`).then((res) =>
    res.json()
  );
};

export const deleteClaim = async (claim) => {
  return fetch(`http://localhost:8088/claims/${claim.id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
