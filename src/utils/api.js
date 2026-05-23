const baseUrl = "http://localhost:3001";

export const checkResponse = async (res) => {
  if (!res.ok) {
    let errorMessage = `Error: ${res.status}`;

    try {
      const errorData = await res.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Keep the fallback status-based message when response has no JSON body.
    }

    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
};

const request = (path, options = {}) => {
  return fetch(`${baseUrl}${path}`, options).then(checkResponse);
};

const createHeaders = (token, includeJson = false) => {
  const headers = {};

  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const normalizeItem = (item) => ({
  ...item,
  link: item.link ?? item.imageUrl,
  likes: item.likes ?? [],
});

const normalizeUser = (user) => ({
  ...user,
  avatar: user.avatar ?? "",
  name: user.name ?? "",
  email: user.email ?? "",
});

const unwrap = (payload) => payload?.data ?? payload;

const getItems = () => {
  return request("/items").then((items) => unwrap(items).map(normalizeItem));
};

const addItem = ({ name, imageUrl, weather }, token) => {
  return request("/items", {
    method: "POST",
    headers: createHeaders(token, true),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((item) => normalizeItem(unwrap(item)));
};

const deleteItem = (id, token) => {
  return request(`/items/${id}`, {
    method: "DELETE",
    headers: createHeaders(token),
  });
};

const addCardLike = (id, token) => {
  return request(`/items/${id}/likes`, {
    method: "PUT",
    headers: createHeaders(token),
  }).then((item) => normalizeItem(unwrap(item)));
};

const removeCardLike = (id, token) => {
  return request(`/items/${id}/likes`, {
    method: "DELETE",
    headers: createHeaders(token),
  }).then((item) => normalizeItem(unwrap(item)));
};

const updateUserProfile = ({ name, avatar }, token) => {
  return request("/users/me", {
    method: "PATCH",
    headers: createHeaders(token, true),
    body: JSON.stringify({ name, avatar }),
  }).then((user) => normalizeUser(unwrap(user)));
};

export {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUserProfile,
};
