import { select } from '../settings.js';
import SongLibrary from './SongLibrary.js';

class SongDiscover extends SongLibrary{
  constructor(data){
    super(data);
    const thisSongLibrary = this;

    thisSongLibrary.randomSong();
    thisSongLibrary.renderSongsList();

  }

  renderSubscribe(){
    
  }

  randomSong(){
    const thisSongLibrary = this;

    const lenghtData = thisSongLibrary.data.length;

    const randomNumber = Math.floor((Math.random() * lenghtData) + 1);
    thisSongLibrary.index = randomNumber;
  }

  renderSongsList(){
    const thisSongLibrary = this;

    const song = thisSongLibrary.data.find(song => song.id === thisSongLibrary.index);

    if(song){
      thisSongLibrary.prepareSongData(song);
      thisSongLibrary.renderSong(thisSongLibrary.dataSong, select.containerOf.discover);
    }
    console.log(song);
  }
}

export default SongDiscover;