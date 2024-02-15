export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  },
};

export const select = {
  templateOf: {
    listSongs: '#template-list-songs',
    categoriesHome: '#template-categories-nav',
    categoriesSearch: '#template-categories-search',
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
    categoriesHome: '#home-categories',
    categoriesSearch: '#search-box__categories',
  },
  nav: {
    links: '.main-nav a',
  },
  search: {
    input: '.search-box input',
    button: '.search-box button',
    numberSong: '.num-found-songs',
    selectedCategories: 'music-categories',
  },
  home: {
    categoriesList: '#home-categories .categories-nav__list',
    setAttributeData: '.song .details-categories__list',
    dataCategories: 'data-categories',
    songs: '#home .song',
    categoriesSong: '.details-categories__list',
    inactive: '.search-inactive',
    activeCategories: '.active',
    buttonJoinNow: '.btn-join-now',
  },
  joinNow: {
    page: '.btn-join-now',
  }
};

export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },
  categories: {
    active: 'active',
    searchInactive: 'search-inactive',
  }
};

export const templates = {
  listSongs: Handlebars.compile(document.querySelector(select.templateOf.listSongs).innerHTML),
  categoriesNav: Handlebars.compile(document.querySelector(select.templateOf.categoriesHome).innerHTML),
  categoriesSearch: Handlebars.compile(document.querySelector(select.templateOf.categoriesSearch).innerHTML),
};