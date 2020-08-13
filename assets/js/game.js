// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

let fight = function (enemy) {
  while (enemy.health > 0 && player.health > 0) {
    // Ask the player if they want to fight or not
    let promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );

    if (promptFight != null) {
      promptFight = promptFight.toLowerCase();
    }

    if (promptFight === "skip") {
      // confirm user wants to skip
      let confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        console.log(player.name + " has decided to skip this fight. Goodbye!");
        // subtract money from player.money for skipping
        player.money = Math.max(0, player.money - 10);
        console.log("player.money", player.money);

        // Leave the fight
        break;
      }
      // if no (false), ask question again by running fight() again
      else {
        fight(enemy.name);
      }
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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  shopOptionPrompt = shopOptionPrompt.toLowerCase();

  // use switch to carry out action
  switch (shopOptionPrompt) {
    // If refill, subtract money points from player and increase health
    case "refill":

      if (player.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase health and decrease money
        player.health = player.health + 20;
        player.money = player.money - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;

    // If upgrade, subtract money points from player and increase attack power
    case "upgrade":

      if (player.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // increase attack and decrease money
        player.attack = player.attack + 6;
        player.money = player.money - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;

    // If leave, alert goodbye and exit the function
    case "leave":
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

// The Player
let player = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },
  refillHealth: function() {
    this.health += 20;
    this.money -= 7;
  },
  upgradeAttack: function() {
    this.attack += 6;
    this.money -= 7;
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