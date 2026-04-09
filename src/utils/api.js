const baseUrl = "http://localhost:3001";

const checkResponse = async (res) => {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
};

const normalizeItem = (item) => ({
  ...item,
  link: item.link ?? item.imageUrl,
});

const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((items) => items.map(normalizeItem));
};

const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then(normalizeItem);
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};

export { getItems, addItem, deleteItem };