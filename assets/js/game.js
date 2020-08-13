// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

let fight = function (enemy) {
  while (enemy.health > 0 && player.health > 0) {
    // Ask the player if they want to fight or not
    if (fightOrSkip()) {
      // If true, the Player is skipping the fight
      break;
    }

    // remove enemy's health by subtracting the amount set in the player.attack variable
    // generate random damage value based on player's attack power
    let damage = randomNumber(player.attack - 3, player.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      player.name +
      " attacked " +
      enemy.name +
      ". " +
      enemy.name +
      " now has " +
      enemy.health +
      " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");

      // award player money for winning
      player.money = player.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      console.log(enemy.name + " still has " + enemy.health + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    // generate random damage value based on enemy's attack power
    damage = randomNumber(enemy.attack - 3, enemy.attack);

    player.health = Math.max(0, player.health - damage);
    console.log(
      enemy.name +
      " attacked " +
      player.name +
      ". " +
      player.name +
      " now has " +
      player.health +
      " health remaining."
    );

    // check player's health
    if (player.health <= 0) {
      window.alert(player.name + " has died!");
      // leave while() loop if player is dead
      break;
    } else {
      console.log(player.name + " still has " + player.health + " health left.");
    }
  }
};

let startGame = function () {
  // reset player stats
  player.reset();

  // Loop through enemies until you win or you die or you flee
  for (let i = 0; i < enemy.length; i++) {
    if (player.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      let pickedEnemyObj = enemy[i];
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);

      // Ask player if they want to shop
      if ((player.health > 0) && (i < enemy.length - 1)) {
        // ask if user wants to use the store before next round
        let storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  // End the game
  endGame();
};

let endGame = function () {
  // Display the user's stats 
  if (player.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + player.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

  // Ask if the user wants to play again
  let playAgainConfirm = window.confirm("Would you like to play again?");

  // If the user wants to play again, start the game
  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  // If the user is done, end
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

let shop = function () {
  // Ask player if they want to refill health, upgrade attack, or leave the shop
  let shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch to carry out action
  switch (shopOptionPrompt) {
    // If refill, subtract money points from player and increase health
    case "1":

      player.refillHealth();
      break;

    // If upgrade, subtract money points from player and increase attack power
    case 2:

      player.upgradeAttack();
      break;

    // If leave, alert goodbye and exit the function
    case 3:
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;

    // If any other invalid option, call shop() again
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// function to generate a random numeric value
let randomNumber = function (min, max) {
  let value = Math.floor(Math.random() * (max - min + 1)) + min;

  return value;
};

// function to set name
let getPlayerName = function () {
  let name = "";

  do {
    name = window.prompt("What is your robot's name?");
  } while ((name === null) || (name === ""));

  console.log("Your robot's name is " + name);
  return name;
};

let fightOrSkip = function () {
  // ask user if they'd like to fight or skip using  function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Enter the conditional recursive function call here!
  // Conditional Recursive Function Call
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();

  // if user picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(player.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      player.playerMoney = Math.max(0, player.money - 10);

      return true;
    }
  }
  return false;
};

// The Player
let player = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

// The Enemies
let enemy = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// start the game on page load
startGame();