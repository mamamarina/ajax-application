const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((json) => {
    if (json.Search) return json.Search;
    throw Error('Сервер вернул неправильный объект');
  });
let searchLast = null;
inputSearch.addEventListener('keyup', (e) => {
  delay(() => {
    const searchString = e.target.value;
  if(searchString && searchString.length > 3 && searchString !== searchLast) {
    if (!triggerMode) clearMoviesMarkup();
    getData(`http://www.omdbapi.com/?s=${searchString}&apikey=3551bd7b&`)
    .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
    .catch((err) => console.log(err));
  }
  searchLast = searchString;
  }, 1000);
  }); 

//первый вариант реализации
// let search1 = 'Iron Man';
// let search2 = 'Batman';
// let search3 = 'Superman';
// let search4 = 'Cinderella';
// let search5 = 'Star wars';
// let search6 = 'X-files';
// let search7 = 'Home alone';

// let ironman = getData(`http://www.omdbapi.com/?s=${search1}&apikey=3551bd7b&`);
// let batman = getData(`http://www.omdbapi.com/?s=${search2}&apikey=3551bd7b&`);
// let superman = getData(`http://www.omdbapi.com/?s=${search3}&apikey=3551bd7b&`);
// let cinderella = getData(`http://www.omdbapi.com/?s=${search4}&apikey=3551bd7b&`);
// let starWars = getData(`http://www.omdbapi.com/?s=${search5}&apikey=3551bd7b&`);
// let xFiles = getData(`http://www.omdbapi.com/?s=${search6}&apikey=3551bd7b&`);
// let homeAlone = getData(`http://www.omdbapi.com/?s=${search7}&apikey=3551bd7b&`);

// Promise.all([ironman,batman,superman,cinderella,starWars,xFiles,homeAlone])
// .then((movies) => movies.forEach((movie) => addMovieToList(movie))))
// .catch((err) => console.log(err));






  