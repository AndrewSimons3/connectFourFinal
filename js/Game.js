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

  //allows player to move left, right and play token
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
      activeToken.drop(targetSpace, function() {

      });
    }
  }

  //switches active player
  switchPlayers() {
    for (let player of this.players) {
      player.active = player.active === true ? false : true;
    }
  }

  //Updates game state after token is dropped. 
  updateGameState(token, target) {
    target.mark();
    if (this.checkForWin) {
      this.gameOver();
    } else {
      !this.checkForWin {
      this.switchPlayers;
      }
    }
  }

  //logic to check for a winner
  checkForWin(target){
    const owner = target.token.owner;
    let win = false;

    // vertical
    for (let x = 0; x < this.board.columns; x++ ){
          for (let y = 0; y < this.board.rows - 3; y++){
              if (this.board.spaces[x][y].owner === owner && 
          this.board.spaces[x][y+1].owner === owner && 
          this.board.spaces[x][y+2].owner === owner && 
          this.board.spaces[x][y+3].owner === owner) {
                    win = true;
              }           
          }
      }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++ ){
          for (let y = 0; y < this.board.rows; y++){
              if (this.board.spaces[x][y].owner === owner && 
          this.board.spaces[x+1][y].owner === owner && 
          this.board.spaces[x+2][y].owner === owner && 
          this.board.spaces[x+3][y].owner === owner) {
                    win = true;
              }           
          }
      }
  
    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
          for (let y = 0; y < this.board.rows - 3; y++){
              if (this.board.spaces[x][y].owner === owner && 
          this.board.spaces[x-1][y+1].owner === owner && 
          this.board.spaces[x-2][y+2].owner === owner && 
          this.board.spaces[x-3][y+3].owner === owner) {
                    win = true;
              }           
          }
      }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
          for (let y = 3; y < this.board.rows; y++){
              if (this.board.spaces[x][y].owner === owner && 
          this.board.spaces[x-1][y-1].owner === owner && 
          this.board.spaces[x-2][y-2].owner === owner && 
          this.board.spaces[x-3][y-3].owner === owner) {
                    win = true;
              }           
          }
      }

    return win;
  }

  //displays game over message.
  gameOver(message) {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over').textContent = message;
  }

}