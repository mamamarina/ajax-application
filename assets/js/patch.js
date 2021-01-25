async function patchData(url, data) {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw Error(response.status);
  return response.json();
}

patchData('https://jsonplaceholder.typicode.com/posts/1', {
  title: 'My custom title text',
  userId: 111,
  body: 'Body text'
})
.then(data => console.log(data))
.catch((err) => console.log(err));
