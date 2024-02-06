/* global GreenAudioPlayer */

class Player{
  constructor(selector){
    const thisPlayer = this;

    thisPlayer.initPlayer(selector);
  }

  initPlayer(selector){
    GreenAudioPlayer.init({
      selector: selector, // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  }
}

export default Player;