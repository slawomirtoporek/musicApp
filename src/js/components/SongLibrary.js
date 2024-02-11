import { templates, select } from '../settings.js';
import { utils } from '../utils.js';
import Player from './Player.js';

class SongLibrary{
  constructor(data){
    const thisSongLibrary = this;

    thisSongLibrary.data = data;
    thisSongLibrary.dataSong = {};
    thisSongLibrary.dom = {};
    thisSongLibrary.categories = {};

    thisSongLibrary.buildCategoriesList();
    thisSongLibrary.renderSongsList();
  }

  renderSong(song, container){
    const thisSongLibrary = this;
    const generatedHTML = templates.listSongs(song);
    thisSongLibrary.element = utils.createDOMFromHTML(generatedHTML);
    const list = document.querySelector(container);
    list.appendChild(thisSongLibrary.element);

    const categoriesListElement = thisSongLibrary.element.querySelector(select.home.setAttributeData);
    if (categoriesListElement) {
      const categoriesString = song.categories.join(' ').toLowerCase();
      categoriesListElement.setAttribute('data-categories', categoriesString);
    }
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
  
  buildCategoriesList(){
    const thisSongLibrary = this;

    thisSongLibrary.categories.name = [];

    for(const song of thisSongLibrary.data){
      for(const nameCategories of song.categories){
        if(!thisSongLibrary.categories.name.includes(nameCategories)){
          thisSongLibrary.categories.name.push(nameCategories); 
        }
        console.log('categories', thisSongLibrary.categories);
      }
    }
  }

  renderCategoriesNav(){
    const thisSongLibrary = this;
    const generatedHTML = templates.categoriesNav(thisSongLibrary.categories);
    thisSongLibrary.element = utils.createDOMFromHTML(generatedHTML);
    console.log(thisSongLibrary.element);
    const listCategory = document.querySelector(select.containerOf.categoriesHome);
    listCategory.appendChild(thisSongLibrary.element);
  }

  renderSongsList(){
    const thisSongLibrary = this;

    thisSongLibrary.renderCategoriesNav();

    for(const song of thisSongLibrary.data){
      thisSongLibrary.prepareSongData(song);
      thisSongLibrary.renderSong(thisSongLibrary.dataSong, select.containerOf.songs);

    }
    thisSongLibrary.initPlayer();
  }

  initPlayer(){
    new Player(select.containerOf.playerHome);
  }
}
export default SongLibrary;