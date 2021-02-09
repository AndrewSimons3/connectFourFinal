class Token {
  constructor(index, owner) {
      this.owner = owner;
      this.id = `token-${index}-${owner.id}`;
      this.dropped = false;
  }

  drawHTMLToken() {
    let tokens = document.createElement('div');
    tokens.appendChild('game-board-underlay');
    tokens.setAttribute('id', this);
    tokens.setAttribute('class', 'token');
    tokens
  }

  htmlToken() {

  }
}