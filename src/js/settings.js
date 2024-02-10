export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  },
};

export const select = {
  templateOf: {
    listSongs: '#template-list-songs',
    category: '#template-category-nav',
  },
  containerOf: {
    playerHome: '#home-page .player',
    playerDiscover: '#discover-page .player',
    playerSearch: '#search-page .player',
    pages: '#pages',
    songs: '#home-page',
    discover: '#discover-page',
    search: '#search-page',
    subscribe: '#subscribe',
    category: '#home-category',
  },
  nav: {
    links: '.main-nav a',
  },
  search: {
    input: '.search-box input',
    button: '.search-box button',
    numberSong: '.num-found-songs',
  },
  home: {
    categoryLi: '#home-category .category-nav__item',
    setAttributeData: '.song .details-categories__list',
  }
};

export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  }
};

export const templates = {
  listSongs: Handlebars.compile(document.querySelector(select.templateOf.listSongs).innerHTML),
  categoryNav: Handlebars.compile(document.querySelector(select.templateOf.category).innerHTML),
};