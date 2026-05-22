const baseUrl = "http://localhost:3001";

const checkResponse = async (res) => {
  if (!res.ok) {
    let errorMessage = `Error: ${res.status}`;

    try {
      const errorData = await res.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Use status fallback when server doesn't provide JSON.
    }

    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
};

const unwrap = (payload) => payload?.data ?? payload;

const signup = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then(checkResponse)
    .then(unwrap);
};

const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then(unwrap);
};

const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then(unwrap);
};

export { signup, signin, checkToken };