async function deleteData(url) {
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (response.ok) return true;

  return false;
}

deleteData('https://jsonplaceholder.typicode.com/posts/1', {
  title: 'My custom title text',
  userId: 111,
  body: 'Body text'
})
.then(data => console.log(data))
.catch((err) => console.log(err));
