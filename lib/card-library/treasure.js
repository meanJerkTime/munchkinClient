'use strict';

/** Treasure card class representing items, equipment, level up cards etc. */
class Treasure {

  /**
   * Generate new trasure cards. Bling bling!
   * @param {number} bonus - Bonus granted to a player's combat power.
   * @param {string} name  - Name of the item/equipment/thing.
   * @param {string} description - Description of the card, if any.
   * @param {string} modifier - Any modifier this card offers to combat power. Mostly relating to one time use cards.
   * @param {string} effect - Additional function a card may offer. Examples would be level up, erase monsters, free combat win etc. Typically would involve a function to provde additional support.
   * @constructor
   */
  constructor(
    bonus = 0,
    name = null,
    description = null,
    modifier = {
      description: null,
      effect: null,
    },
    effect = {
      description: null,
      effect: null,
    },
  ) {
    this.bonus = bonus;
    this.name = name;
    this.description = description;
    this.modifier = modifier;
    this.effect = effect;
  };

  /** Handler for level up card effecr */
  // levelUp(){

  // }

};

let test = new Treasure();
console.log(test);

module.exports = Treasure;