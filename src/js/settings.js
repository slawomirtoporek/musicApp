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
    player: '.player',
    pages: '#pages',
    songs: '#home-page',
    discover: '#discover-page',
    search: '#search-page',
    subscribe: '#subscribe',
  },
  nav: {
    links: '.main-nav a',
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
  subscribe: Handlebars.compile(document.querySelector(select.templateOf.subscribe).innerHTML),
};