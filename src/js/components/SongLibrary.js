import { templates, select } from '../settings.js';
import { utils } from '../utils.js';

class SongLibrary{
  constructor(data){
    const thisSongLibrary = this;

    thisSongLibrary.data = data;
    thisSongLibrary.dataSong = {};

    thisSongLibrary.renderSubscribe();
    thisSongLibrary.renderSongsList();
  }

  renderSong(song, container){
    const thisSongLibrary = this;
    const generatedHTML = templates.listSongs(song);
    thisSongLibrary.element = utils.createDOMFromHTML(generatedHTML);
    const list = document.querySelector(container);
    list.appendChild(thisSongLibrary.element);
  }

  renderSubscribe(){
    const thisSongLibrary = this;

    const generatedHTML = templates.subscribe();
    thisSongLibrary.elementSubscribe = utils.createDOMFromHTML(generatedHTML);
    const container = document.querySelector(select.containerOf.subscribe);
    container.appendChild(thisSongLibrary.elementSubscribe);
  }

  extractAuthorNameFromFilename(filename, title){
    const nameSrc = filename;
    const titleSong = title;

    const clearDataName = nameSrc.replace('.mp3', '').replaceAll(/[_-]+/g, ' ').trim().toLowerCase();
    const nameTable = clearDataName.split(/\s+/);

    const titleLowerCase = titleSong.toLowerCase();
    const titleTable = titleLowerCase.split(' ');

    for(const elTitle of titleTable){
      const indexToRemove = nameTable.indexOf(elTitle);
      if(indexToRemove != -1){
        nameTable.splice(indexToRemove, 1);
      }
    }

    const firstLetterCapitalize = [];

    for(const name of nameTable){
      const elemName = name[0].toUpperCase() + name.substring(1);
      firstLetterCapitalize.push(elemName);
    }

    const author = firstLetterCapitalize.join(' ');
    return author;
  }

  prepareSongData(data){
    const thisSongLibrary = this;

    thisSongLibrary.dataSong = {
      idSong: data.id,
      title: data.title,
      authorId: data.author,
      author: thisSongLibrary.extractAuthorNameFromFilename(data.filename, data.title),
      filename: data.filename,
      categories: data.categories,
      ranking: data.ranking,
    };
  }

  renderSongsList(){
    const thisSongLibrary = this;
    for(const song of thisSongLibrary.data){
      thisSongLibrary.prepareSongData(song);
      thisSongLibrary.renderSong(thisSongLibrary.dataSong, select.containerOf.songs);
    }
  }
}
export default SongLibrary;