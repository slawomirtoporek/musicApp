import { settings } from './settings.js';
import HomeSongs from './components/HomeSongs.js';

const app = {

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
      });
  },

  init: function(){
    const thisApp = this;

    thisApp.initData();
  }
};

app.init();