var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyName, enemyHealth, enemyAttack);

var playerStatus = function(name, health, attack) {
  console.log(name + "\thealth:" + health + "\tattack:" + attack);
}

var fight = function() {
  window.alert("Welcome to Robot Gladiators!");
  
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

  // Display each combatant's statistics
  playerStatus(playerName, playerAttack, playerHealth);
  playerStatus(enemyName, enemyHealth, enemyAttack);

};

fight();