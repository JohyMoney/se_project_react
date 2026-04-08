const getitems = async () => {
  try {
    const response = await fetch("http://localhost:3001/items");
    fetch ('${baseUrl}/items ', {
      method: 'GET',
      headers: {    'Content-Type': 'application/json',
      },
    }   ).then((res) => {      if (res.ok) {        return res.json();
      }      return Promise.reject(`Error: ${res.status}`);
    });
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addcard = ({name,link}) => {
return fetch(`${baseUrl}/items`, {
  method: 'POST',
  headers: {    'Content-Type': 'application/json',
  },
}   ).then((res) => {      if (res.ok) {        return res.json();
  }      return Promise.reject(`Error: ${res.status}`);
});

export const deletecard = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then(handleServerResponse);
};

export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST', 
    name,
    imageUrl,
    weather,

  })
   then(handleServerResponse);    
};



export { getitems, postItem, deleteItem, addcard, deletecard };