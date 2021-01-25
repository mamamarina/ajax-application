async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw Error(response.status);
  return response.json();
}

postData('https://jsonplaceholder.typicode.com/posts', {
  title: 'My custom title text',
  descr: 'Description text',
  body: 'Body text'
})
.then(data => console.log(data))
.catch((err) => console.log(err));
