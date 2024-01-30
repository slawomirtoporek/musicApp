import { templates, select } from '../settings.js';
import { utils } from '../utils.js';

class Song{
  constructor(title, data){
    const thisSong = this;

    thisSong.title = title;
    thisSong.data = data;

    thisSong.render();
  }

  render(){
    const thisSong = this;

    const generatedHTML = templates.listSongs(thisSong.data);

    thisSong.element = utils.createDOMFromHTML(generatedHTML);

    const listSongs = document.querySelector(select.containerOf.songs);

    listSongs.appendChild(thisSong.element);
  }
}

export default Song;