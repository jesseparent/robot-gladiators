var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyName, enemyHealth, enemyAttack);

var playerStatus = function(name, health, attack, money) {
  console.log(name + "\thealth:" + health + "\tattack:" + attack + "\tmoney:" + money);
}

var fight = function() {
  window.alert("Welcome to Robot Gladiators!");
  
  // Ask the player if they want to fight or not
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  console.log(promptFight);

  // if player choses to fight, then fight
  if (promptFight.toLowerCase() === "fight") {
    // Player attacks enemy
    enemyHealth -= playerAttack;
    console.log(playerName + " successfully attacked " + enemyName);
    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
    } 
    else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // Enemy attacks player
    playerHealth -= enemyAttack;
    console.log(enemyName + " successfully attacked " + playerName);
    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
    } 
    else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  } else if (promptFight.toLowerCase() === "skip") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney = playerMoney - 2;
    }
    // if no (false), ask question again by running fight() again
    else {
      fight();
    }

    // Display each combatant's statistics
    playerStatus(playerName, playerAttack, playerHealth, playerMoney);
    playerStatus(enemyName, enemyHealth, enemyAttack, "N/A");    
  } else {
    window.alert("You need to pick a valid option. Try again!");
  }
};

fight();