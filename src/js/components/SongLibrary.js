import { templates, select, classNames } from '../settings.js';
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
      categoriesListElement.setAttribute(select.home.dataCategories, categoriesString);
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
      }
    }
  }

  renderCategoriesNav(templates, container){
    const thisSongLibrary = this;
    const generatedHTML = templates(thisSongLibrary.categories);
    thisSongLibrary.element = utils.createDOMFromHTML(generatedHTML);
    const listCategory = document.querySelector(container);
    listCategory.appendChild(thisSongLibrary.element);
  }

  filterSongsByCategory(){
    const listCategories = document.querySelector(select.home.categoriesList);
    
    listCategories.addEventListener('click', function(event){
      event.preventDefault();
  
      const clickedElement = event.target.closest('li');
  
      if(clickedElement){
        if(clickedElement && clickedElement.classList.contains(classNames.categories.active)){
          clickedElement.classList.remove(classNames.categories.active);

          const songs = document.querySelectorAll(select.home.songs);
          for(const song of songs){
            song.classList.remove(classNames.categories.searchInactive);
          }
        } else {
          const activeCategories = listCategories.querySelectorAll(select.home.activeCategories);
          for(const category of activeCategories){
            category.classList.remove(classNames.categories.active);
          }
          clickedElement.classList.add(classNames.categories.active);
  
          const songs = document.querySelectorAll(select.home.songs);
          for(const song of songs){
            const songCategories = song.querySelector(select.home.categoriesSong);
            const dataAttributes = songCategories.getAttribute(select.home.dataCategories);
            const attributeArray = dataAttributes.split(' ');
            const cleanCategory = clickedElement.innerText.replace(',', '').toLowerCase();
            if(!attributeArray.includes(cleanCategory)){
              song.classList.add(classNames.categories.searchInactive);
            } else {
              song.classList.remove(classNames.categories.searchInactive);
            }
          }
        }
      }
    });
  }

  renderSongsList(){
    const thisSongLibrary = this;

    for(const song of thisSongLibrary.data){
      thisSongLibrary.prepareSongData(song);
      thisSongLibrary.renderSong(thisSongLibrary.dataSong, select.containerOf.songs);
    }
    thisSongLibrary.renderCategoriesNav(templates.categoriesNav, select.containerOf.categoriesHome);
    thisSongLibrary.filterSongsByCategory();
    thisSongLibrary.initPlayer();
  }

  initPlayer(){
    new Player(select.containerOf.playerHome);
  }
}
export default SongLibrary;