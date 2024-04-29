export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      alert("Failed to retrieve data. Please try again later.");
    });
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const loginUser = (email, password) => {
  return fetch("http://localhost:5000/api/Auth/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      return Promise.resolve(null);
    } else {
      return tryGetLoggedInUser();
    }
  });
};

export const logout = () => {
  return fetch("http://localhost:5000/api/Auth/logout");
};

export const tryGetLoggedInUser = () => {
  return fetch("http://localhost:5000/api/Auth/Me").then((res) => {
    return res.status === 401 ? Promise.resolve(null) : res.json();
  });
};

export const register = (userProfile) => {
  userProfile.password = btoa(userProfile.password);
  return fetch("http://localhost:5000/api/Auth/register", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  }).then(() => tryGetLoggedInUser());
};
