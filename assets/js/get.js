async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw Error(response.status);
  return response.json();
}

// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/posts/100

getData('https://jsonplaceholder.typicode.com/posts/100')
.then(data => console.log(data))
.catch((err) => console.log(err));
