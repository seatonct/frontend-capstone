export const createClaim = (claim) => {
  return fetch(`http://localhost:8088/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(claim),
  }).catch((error) => {
    console.error(error);
    alert("Failed to retrieve data. Please try again later.");
  });
};

export const getAllClaims = () => {
  return fetch(`http://localhost:8088/claims`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const getClaimsByUserId = (userId) => {
  return fetch(`http://localhost:8088/claims?userId=${userId}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const getClaimByItemId = (itemId) => {
  return fetch(`http://localhost:8088/claims?itemId=${itemId}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const deleteClaim = (claim) => {
  return fetch(`http://localhost:8088/claims/${claim.id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};
