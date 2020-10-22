'use strict';

/** Curse class representing curse cards and their effects. */
class Curse {

  /**
   * Generate new Curse! cards. Oh no!
   * @param {string} title - As is obvious, the title of Curse! cards. Never changes. 
   * @param {string} name - The name of the Curse! card.
   * @param {string} description - Description of the Curse! card.
   * @param {string} effect - The effect of the Curse! card. Could be anything from losing a level to losing items to combat modifier.
   * @constructor
   */
  constructor(
    title = 'Curse!',
    name = null,
    description = null,
    effect = null,
  ) {
    this.title = title;
    this.name = name;
    this.description = description;
    this.effect = effect;
  };

};

let test = new Curse();
console.log(test);

module.exports = Curse;