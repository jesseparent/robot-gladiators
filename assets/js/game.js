// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

// The Player
let playerName = window.prompt("What is your robot's name?");
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

// The Enemies
let enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

let fight = function(enemyName) {  
  while (enemyHealth > 0) {
    // Ask the player if they want to fight or not
    let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.").toLowerCase();

    // if player choses to fight, then fight
    if (promptFight === "fight") {
      
      // Player attacks enemy
      enemyHealth -= playerAttack;
      console.log(playerName + "  attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
      
      // Enemy attacks player
      playerHealth -= enemyAttack;
      console.log(enemyName + "  attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
      
    } else if (promptFight === "skip") {
      // confirm user wants to skip
      let confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        console.log(playerName + " has decided to skip this fight. Goodbye!");
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
      console.log("You need to pick a valid option. Try again!");
    }
  }
};

for (var i = 0; i < enemyNames.length; i++) {
  var pickedEnemyName = enemyNames[i];
  enemyHealth = 50;
  fight(pickedEnemyName);
}