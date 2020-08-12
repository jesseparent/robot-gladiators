// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

// The Player
let playerName = window.prompt("What is your robot's name?");
let playerHealth = 96;
let playerAttack = 10;
let playerMoney = 10;

// The Enemies
let enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;

let fight = function (enemyName) {
  while (enemyHealth > 0 && playerHealth > 0) {
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
        console.log(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);

        // Leave the fight
        break;
      }
      // if no (false), ask question again by running fight() again
      else {
        fight(enemyName);
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName +
      " attacked " +
      enemyName +
      ". " +
      enemyName +
      " now has " +
      enemyHealth +
      " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      console.log(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName +
      " attacked " +
      playerName +
      ". " +
      playerName +
      " now has " +
      playerHealth +
      " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      // leave while() loop if player is dead
      break;
    } else {
      console.log(playerName + " still has " + playerHealth + " health left.");
    }
  }
};

let startGame = function () {
  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  // Loop through enemies until you win or you die or you flee
  for (let i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      let pickedEnemyName = enemyNames[i];
      enemyHealth = 50;
      fight(pickedEnemyName);
    }
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }

    // Ask player if they want to shop

  }
  // End the game
  endGame();
};

let endGame = function () {
  // Display the user's stats 
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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

  // If refill, subtract money points from player and increase health

  // If upgrade, subtract money points from player and increase attack power

  // If leave, alert goodbye and exit the function

  // If any other invalid option, call shop() again
};

// start the game on page load
startGame();