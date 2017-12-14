var gems = 100;
var gold = 10000;
var playerHP = 1000;
var nrgStamina = 100;
var atkStamina = 100;
var enemyType = "Normal";
var randomChance = Math.random() * 100;
var pLevel = 1;
var pXP = 0;
var pATK = 10;
var dmgEnemy = 100;
var potentialXP = 0;
var nextXPNeeded = 100;
var cdForMinute = 59;
var cdForSecond = 2;
var initialEnemyHP = 100;
window.onload = createEnemy();
if (localStorage.getItem("save") === null){
console.log("Save Doesn't Exist")
} else { 
window.onload = load(); 
};

//Fix Rounding Numbers
function roundProperly(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

//Second Timer
window.setInterval(function() {
	if (cdForSecond === 0){
		cdForSecond = 2
	}
	document.getElementById("updateSTime").innerHTML= "On Off Regulator: " + cdForSecond;
	cdForSecond = cdForSecond - 1;	
}, 1000);

//Minute Timer
window.setInterval(function() {
	if (cdForMinute === 0){
		cdForMinute = 60
	}
	document.getElementById("updateMTime").innerHTML= "Timer: " + cdForMinute;
	cdForMinute = cdForMinute - 1;
}, 1000);

//Check at Second Intervals
window.setInterval(function(){
//Free Gems Every Minute
	if (cdForMinute === 0){
		gems++
	}
//Auto Attack Every Second
	attackFunction();
}, 1000);

//100ms Intervals
window.setInterval(function(){
//Update Health Bar
	document.getElementById("enemyHealthBar").value = dmgEnemy;
	document.getElementById("enemyHealthBar").max = initialEnemyHP;
}, 100);

//Levelling Up
window.setInterval(function() {
	
	if (pXP >= nextXPNeeded){
		nextXPNeeded = nextXPNeeded * 1.25;
		pLevel++;
		pATK = Math.floor(pATK * Math.pow(1.1, 1))
	}
	
	if (dmgEnemy <= 0){
		gold = gold + potentialXP / 20;
		pXP = pXP + potentialXP;
		createEnemy()
	}

	document.getElementById("pXP").innerHTML= "Your XP: " + roundProperly(pXP);
	document.getElementById("pLevel").innerHTML= "Your Level is: " + roundProperly(pLevel);
	document.getElementById("pEnergy").innerHTML= "Energy: " + roundProperly(nrgStamina);
	document.getElementById("pStamina").innerHTML= "Stamina: " + roundProperly(atkStamina);
	document.getElementById("pGold").innerHTML= "Your gold: " + roundProperly(gold);
	document.getElementById("pGems").innerHTML= "Your gems: " + roundProperly(gems);
}, 100);

function createEnemy(){
if (Math.random() * 100 < 5) {
		dmgEnemy = 10000;
		initialEnemyHP = 10000;
		potentialXP = dmgEnemy * 1.25;
		var enemyNameArray1 = ["Ren'po", "Litan", "Da-quarr", "Gre-burll", "Tian'bron"]
		var enemyNameArray2 = ["The Wicked", "The Destroyer", "The Invincible"]
		var bossName1 = enemyNameArray1[Math.floor(Math.random()*enemyNameArray1.length)];
		var bossName2 = enemyNameArray2[Math.floor(Math.random()*enemyNameArray2.length)];
		enemyName = "" + bossName1 + " " + bossName2 + "";
		enemyType = "Enemy Type: Event";
		document.getElementById("eType").innerHTML= enemyType;
		document.getElementById("eName").innerHTML= "Enemy Name: " + enemyName;
		document.getElementById("eHealth").innerHTML= "Health: " + dmgEnemy;
		} else if (Math.random() * 100 < 15) {
		dmgEnemy = 1000;
		initialEnemyHP = 1000;
		potentialXP = dmgEnemy * 1.25;
		var enemyNameArray1 = ["Ren'po", "Litan", "Da-quarr", "Gre-burll", "Tian'bron"]
		var enemyNameArray2 = ["The Wicked", "The Destroyer", "The Invincible"]
		var bossName1 = enemyNameArray1[Math.floor(Math.random()*enemyNameArray1.length)];
		var bossName2 = enemyNameArray2[Math.floor(Math.random()*enemyNameArray2.length)];
		enemyName = "" + bossName1 + " " + bossName2 + "";
		var bossTypes = ["Dragon", "Ogre", "Golem"];
		var randomEnemy = bossTypes[Math.floor(Math.random()*bossTypes.length)];
		bossType = "" + randomEnemy + "";
		enemyType = "Enemy Type: Boss";
		document.getElementById("eType").innerHTML= enemyType;
		document.getElementById("eName").innerHTML= "Enemy Name: " + enemyName + " (" + bossType + ")";
		document.getElementById("eHealth").innerHTML= "Health: " + dmgEnemy;
		} else {
		dmgEnemy = 100;
		initialEnemyHP = 100;
		potentialXP = dmgEnemy * 1.25;
		var enemyNameArray1 = ["Ren'po", "Litan", "Da-quarr", "Gre-burll", "Tian'bron"]
		var enemyNameArray2 = ["The Wicked", "The Destroyer", "The Invincible"]
		var bossName1 = enemyNameArray1[Math.floor(Math.random()*enemyNameArray1.length)];
		var bossName2 = enemyNameArray2[Math.floor(Math.random()*enemyNameArray2.length)];
		enemyName = "" + bossName1 + " " + bossName2 + "";
		enemyType = "Enemy Type: Normal";
		document.getElementById("eType").innerHTML= enemyType;
		document.getElementById("eName").innerHTML= "Enemy Name: " + enemyName;
		document.getElementById("eHealth").innerHTML= "Health: " + dmgEnemy;
}
}

function attackFunction(){
	dmgEnemy = dmgEnemy - pATK;
	document.getElementById("eHealth").innerHTML= "Health: " + Math.round(dmgEnemy);
}

//Saving
function save(){
	var save = {
	gems: gems,
	gold: gold,
	playerHP: playerHP,
	nrgStamina: nrgStamina,
	atkStamina: atkStamina,
	pLevel: pLevel,
	pXP: pXP,
	pATK: pATK,
	nextXPNeeded: nextXPNeeded
	}
		localStorage.setItem("save",JSON.stringify(save));
}

//Loading
function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.gems !== "undefined") gems = savegame.gems;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.playerHP !== "undefined") playerHP = savegame.playerHP;
	if (typeof savegame.nrgStamina !== "undefined") nrgStamina = savegame.nrgStamina;
	if (typeof savegame.atkStamina !== "undefined") atkStamina = savegame.atkStamina;
	if (typeof savegame.pLevel !== "undefined") pLevel = savegame.pLevel;
	if (typeof savegame.pXP !== "undefined") pXP = savegame.pXP;
	if (typeof savegame.pATK !== "undefined") pATK = savegame.pATK;
	if (typeof savegame.nextXPNeeded !== "undefined") nextXPNeeded = savegame.nextXPNeeded;
}

//Delete Savefile
function delSave(){
	localStorage.removeItem("save")
}
