'use strict';

/** Player class containing all logic relating to creating, "equiping" and editing fellow Munchkins. */
class Player {

  /**
   * Create new Player. Your own lovable little Munchkin.
   * @param {number} level - The current level of the Player. Starting level is 0.
   * @param {number} combatPower - The fighting capability, or monster killing prowess of the Player. Starts at 0.
   * @param {string} race - The current race of the Player. Default is human.
   * @param {string} sex - The gender of the Player. Can be either male or female.
   * @param {string} job - The job, or class, of the Player. New Munchkins begin without a job/class.
   * @param {object} equipment - All of the equipment and other accoutrements the Player has equiped, contributing to combat power and providing other benefits.
   * @param {array} hand - The cards currently in the Player's hand that have not yet been played.
   * @param {string} cureseEffect - Any effects currently on the Player recieved from a curse/trap card.
   * @constructor
   */
  constructor(
    level = 0,
    combatPower = (level + equipment.bonus),
    race = 'human',
    sex = 'male',
    job = null,
    equipment = {
      bonus: 0,
    },
    hand = [],
    curseEffect = {
      description: null,
      effect: null,
    },
  ) {
    this.level = level;
    this.combtPower = combatPower;
    this.race = race;
    this.sex = sex;
    this.job = job;
    this.equipment = equipment;
    this.hand = hand;
    this.curseEffect = curseEffect;
  };

};

module.exports = Player;