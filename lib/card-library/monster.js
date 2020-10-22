'use strict';

/** Monster card class representing monstes and all we love about them. */
class Monster {

  /**
   * Create a new monster. Scary!
   * @param {number} level - Monsters level, representing their combat power.
   * @param {string} name - Name of the monster. 
   * @param {string} description - Description of the monster.
   * @param {string} otherEffect - Additional modifiers a monster has, such as weak agasint elves or will not pursue below a certain level.
   * @param {string} badStuff - The stuff that happens when you lose to a monster.
   */
  constructor(
    level = 0,
    name = null,
    description = null,
    otherEffect = {
      description: null,
      effect: null,
    },
    badStuff = {
      description: null,
      effect: null,
    },
  ) {
    this.level = level;
    this.name = name;
    this.description = description;
    this.otherEffect = otherEffect;
    this.badStuff = badStuff;
  };

};

let test = new Monster();
console.log(test);

module.exports = Monster;