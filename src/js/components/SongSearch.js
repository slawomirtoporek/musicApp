import { select } from '../settings.js';
import SongLibrary from './SongLibrary.js';
import Player from './Player.js';

class SongSearch extends SongLibrary{
  constructor(data){
    super(data);
    const thisSongLibrary = this;

    thisSongLibrary.search = [];

    thisSongLibrary.renderSongsList();
  }

  renderSongsList(){
    const thisSongLibrary = this;

    const button = document.querySelector(select.search.button);
    const input = document.querySelector(select.search.input);
    const search = document.querySelector(select.containerOf.search);
    
    search.innerHTML = '';

    button.addEventListener('click', function(){
      const currentWord = input.value.toLowerCase();

      thisSongLibrary.search = [];

      const listSongs = document.querySelector(select.containerOf.search);
      listSongs.innerHTML = '';

      for(const song of thisSongLibrary.data){
        thisSongLibrary.prepareSongData(song);

        const title = thisSongLibrary.dataSong.title.toLowerCase();
        const author = thisSongLibrary.dataSong.author.toLowerCase();
        
        if(title.includes(currentWord) || author.includes(currentWord)){
          if(!thisSongLibrary.search.some(track => track.idSong === thisSongLibrary.dataSong.idSong)){
            thisSongLibrary.search.push(thisSongLibrary.dataSong);
          }
        }
      }

      const numberSongsEle = document.querySelector(select.search.numberSong);
      const searchLenght = thisSongLibrary.search.length;

      if(searchLenght > 0){
        numberSongsEle.classList.add('active');
        numberSongsEle.textContent = 'We have found ' + searchLenght + ' songs...';
      } else {
        numberSongsEle.classList.add('active');
        numberSongsEle.textContent = 'Sorry, we don\'t have this song...';
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