import { select, settings, classNames } from './settings.js';
import SongLibrary from './components/SongLibrary.js';
import SongDiscover from './components/SongDiscover.js';
import SongSearch from './components/SongSearch.js';

const app = {

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        
        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    for(let page of thisApp.pages){
      page.classList.toggle(
        classNames.pages.active,
        pageId == page.id
      );
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  joinNowPageRedirection: function(){
    const thisApp = this;

    thisApp.redirectionPage = document.querySelector(select.joinNow.page);
    
    thisApp.redirectionPage.addEventListener('click', function(event){
      event.preventDefault();
      console.log('click');
      
      const id = thisApp.redirectionPage.getAttribute('href').replace('#', '');
        
      thisApp.activatePage(id);

    });

  },

  displayHomePage: function(){
    const thisApp = this;

    new SongLibrary(thisApp.data.songs);
  },

  displayDiscoverPage: function() {
    const thisApp =  this;

    new SongDiscover(thisApp.data.songs);
  },

  displaySearchPage: function() {
    const thisApp =  this;

    new SongSearch(thisApp.data.songs);
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
        
        thisApp.displayHomePage();
        thisApp.displayDiscoverPage();
        thisApp.displaySearchPage();
      });
  },

  init: function(){
    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
    thisApp.joinNowPageRedirection();
  }
};

app.init();