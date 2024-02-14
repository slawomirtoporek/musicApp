import { select } from '../settings.js';
import SongLibrary from './SongLibrary.js';
import Player from './Player.js';
import { templates } from '../settings.js';

class SongSearch extends SongLibrary{
  constructor(data){
    super(data);
    const thisSongLibrary = this;

    thisSongLibrary.search = [];

    thisSongLibrary.renderSongsList();
    thisSongLibrary.renderCategoriesNav(templates.categoriesSearch, select.containerOf.categoriesSearch);
  }

  renderSongsList(){
    const thisSongLibrary = this;

    const button = document.querySelector(select.search.button);
    const input = document.querySelector(select.search.input);
    const search = document.querySelector(select.containerOf.search);
    
    search.innerHTML = '';

    button.addEventListener('click', function(){
      const currentWord = input.value.toLowerCase();
      const selectedCategory = document.getElementById(select.search.selectedCategories);
      const selectedCategoryValue = selectedCategory.value;
      const category = selectedCategoryValue.toLowerCase();

      thisSongLibrary.search = [];

      const listSongs = document.querySelector(select.containerOf.search);
      listSongs.innerHTML = '';

      for(const song of thisSongLibrary.data){
        thisSongLibrary.prepareSongData(song);

        const title = thisSongLibrary.dataSong.title.toLowerCase();
        const author = thisSongLibrary.dataSong.author.toLowerCase();
        const categories = thisSongLibrary.dataSong.categories;
        
        const smallLettetCategory = [];
        
        for(const category of categories){
          smallLettetCategory.push(category.toLowerCase());
        }
        
        const matchesSearch = title.includes(currentWord) || author.includes(currentWord);
        const matchesCategory = category != 'selected' ? smallLettetCategory.includes(category) : true;
        
        if(matchesSearch && matchesCategory){
          if(!thisSongLibrary.search.some(track => track.idSong === thisSongLibrary.dataSong.idSong)){
            thisSongLibrary.search.push(thisSongLibrary.dataSong);
          }
        }
      }

      const numberSongsEle = document.querySelector(select.search.numberSong);
      const searchLength = thisSongLibrary.search.length;
      
      const currentH3 = numberSongsEle.querySelector('h3');
      
      if (currentH3) {
        currentH3.remove();
      }

      if (searchLength > 0) {
        const message = document.createElement('h3');
        message.textContent = 'We have found ' + searchLength + ' songs...';
        numberSongsEle.appendChild(message);
        numberSongsEle.classList.add('active');
      } else {
        const message = document.createElement('h3');
        message.textContent = 'Sorry, we don\'t have this song...';
        numberSongsEle.appendChild(message);
        numberSongsEle.classList.add('active');
      }

      for(const song of thisSongLibrary.search){
        thisSongLibrary.renderSong(song, select.containerOf.search);
      }

      thisSongLibrary.initPlayer();
    });
  }

  initPlayer(){
    new Player(select.containerOf.playerSearch);
  }
}

export default SongSearch;