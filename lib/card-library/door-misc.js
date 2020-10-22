'use strict';

/** Misc Door card class to handle all other Door type cards such as classes, races, monster modifiers etc. */
class DoorMisc {

  /**
   * Generate a new misc Door card. It's a mystery!
   * @param {string} type - This is the card type i.e race, class etc.
   * @param {string} name - The name of the card. Duh!
   * @param {string} description - The description of the card. Is this getting old yet?
   * @param {string} ability - Any aditional function the card has. Class ability, racial ability etc.
   * @param {string} modifier - Any additional modifier this card offers. Dwarf can hold 6 cards, +n to monster etc.
   * @constructor
   */
  constructor(
    type = null,
    name = null,
    description = null,
    ability = {
      description: null,
      effect: null,
    },
    modifier = {
      description: null,
      effect: null,
    },
  ) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.ability = ability;
    this.modifier = modifier;
  };

};

let test = new DoorMisc();
console.log(test);

module.exports = DoorMisc;