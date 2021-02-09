class Player {
  constructor(name, id, color, active = false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.tokens = this.createTokens(21);
  }

  /**
 * Creates token objects for player
 * @param     {number}    num - Number of token objects to be created
 * @returns   {Array}     An array of the newly created token objects
 */
  
  createTokens(num) {
    let tokens = [];

    //for loop to iterate through num
    for (let i = 0; i < num, i++;) {
      let token = new Token(i, this);
      tokens.push(token)
    }

    return tokens;
  }

  //gets all tokens that haven't been dropped
  get unusedTokens() {
    return this.tokens.filter(token => !token.dropped);
  }

  //gets the active token by returning the first token in the array of unused tokens.
  get activeToken() {
    return this.unusedTokens[0];
  }




}