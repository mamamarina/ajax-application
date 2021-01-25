let movieList = null;
let inputSearch = null;
let triggerMode = false;

const createStyle = () => {
  const headstyle = document.createElement('style');
  headstyle.innerHTML = `
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #fff1e0;
    margin: 0;
    font-family: 'Lato', sans-serif;
    color: brown;
  }
  h1 {
    font-family: 'Rubik', sans-serif;
    text-transform: uppercase;
    font-weight: 700;
  }
  .search__label-input,
  h1 {
    text-shadow: 1px 1px 2px tomato;
  }
  .container {
    padding: 20px;
    max-width: 1280px;
    margin: 0 auto;
  }
  .movies {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  .movie {
    display: flex;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    }
  .movie__image {
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
  .search {
    margin-bottom: 30px;
  }
  .search__label-input {
    margin-bottom: 7px;
    display: block;
    font-size: 16px;
    font-weight: bolder;
  }
  .search__input {
    background: radial-gradient(#faebd7, #ffffff);
    padding: 10px 15px;
    width: 300px;
    display: block;
    border: 1px solid tomato;
    border-radius: 4px;
    margin-bottom: 10px;
    outline: none;
    box-shadow: 1px 1px 2px tomato;
    color: brown;
    font-style: italic;
  }
  .search__input::placeholder {
    color: brown;
    opacity: 0.5;
    font-style: italic;
  }
  .search__label-checkbox {
    font-size: 12px;
    display: block;
    margin-top: -17px;
    margin-left: 25px;
  }
  `;
  document.querySelector('head').appendChild(headstyle);
};

const createHeader = (container) => {
  const header = document.createElement('h1');
  header.innerText = 'Приложение для поиска фильмов';
  container.appendChild(header);
};

const setAttribute = (el, attrs) => {
  for (let key in attrs) el.setAttribute(key, attrs[key]);
};

const triggerModeHandler = () => triggerMode = !triggerMode;

const createSearchBox = (container) => {
  const searchBox = document.createElement('div');
  const input = document.createElement('input');
  const labelForInput = document.createElement('label');
  const checkbox = document.createElement('input');
  const labelForCheckbox = document.createElement('label');

  searchBox.setAttribute('class', 'search');

  setAttribute(input, {
    class: 'search__input',
    id: 'search',
    placeholder: 'Начните вводить текст...',
    type: 'text'
  });

  labelForInput.innerText = 'Поиск фильмов';
 
  setAttribute(labelForInput, {
    class: 'search__label-input',
    for: 'search'
  });

  setAttribute(checkbox, {
    class: 'search__checkbox',
    id: 'checkbox',
    type: 'checkbox'
  });
  checkbox.addEventListener('click', triggerModeHandler);

  setAttribute(labelForCheckbox, {
    class: 'search__label-checkbox',
    for: 'checkbox'
  });
  labelForCheckbox.innerText = 'Добавлять фильм к существующему списку';
  searchBox.append(labelForInput,input,checkbox,labelForCheckbox);
    
  container.append(searchBox);
};

const createMarkup = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  createHeader(container);
  createSearchBox(container);

  const movies = document.createElement('div');
  movies.classList.add('movies');
  container.appendChild(movies);
  document.querySelector('body').prepend(container);
  movieList = document.querySelector('.movies');
  inputSearch = document.querySelector('#search');
};

const addMovieToList = (movie) => {
  const item = document.createElement('div');
  const img = document.createElement('img');

  img.src = movie.Poster;
  img.classList.add('movie__image');

  item.classList.add('movie');
  item.appendChild(img);
  movieList.appendChild(item);
};

const clearMoviesMarkup = () => movieList && (movieList.innerHTML = '');

const delay = (() => {
  let timer = 0;

  return (callback, ms) => {
    clearTimeout(timer);
    timer = setInterval(callback, ms);
  };
})();

createStyle();
createMarkup();
