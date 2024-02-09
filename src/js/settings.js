export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  },
};

export const select = {
  templateOf: {
    listSongs: '#template-list-songs',
    subscribe: '#template-subscribe',
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
  },
  nav: {
    links: '.main-nav a',
  },
  search: {
    input: '.search-box input',
    button: '.search-box button',
    numberSong: '.num-found-songs',
  },
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
};