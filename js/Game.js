class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }

  get activePlayer() {
    return this.players.find(player => player.active);
  }

  /** 
 * Creates two player objects
 * @return  {Array}    An array of two Player objects.
 */

  createPlayers() {
    const players = [new Player('Player 1', 1, '#e15258', true),
                     new Player('Player 2', 2, '#e59a13')];
    return players;

  }
  
  //begins game
  startGame(){
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  handleKeydown(event) {
    if (this.ready) {
      if (event.key === "ArrowLeft") {
        this.activePlayer.activeToken.moveLeft();
      } else if (event.key === "ArrowRight") {
        this.activePlayer.activeToken.moveRight(this.board.columns);
      } else if (event.key === "ArrowDown") {
        this.playToken();
      }
    }
  }

  //allows the player to drop the token
  playToken() {
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }
    if (targetSpace !== null){
      game.ready = false;
      activeToken.drop(targetSpace);
    }
  }
}