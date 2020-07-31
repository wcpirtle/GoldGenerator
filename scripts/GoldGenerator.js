/**
 * CivClicker
 * Copyright (C) 2014 David Holley <dhmholley@gmail.com>

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program (if you are reading this on the original
 * author's website, you can find a copy at
 * <http://dhmholley.co.uk/gpl.txt>). If not, see
 * <http://www.gnu.org/licenses/>.
 *
 * If you're reading this, thanks for playing!
 * This project was my first major HTML5/Javascript game, and was as
 * much about learning Javascript as it is anything else. I hope it
 * inspires others to make better games. :)
 * 
 * This file modified by William Pirtle
 * wpirtle2@student.gsu.edu
 * CSC 4821 at Georgia State University
 *
 * This file was modified to the specifications needed for my semester project
 * Gold Generator.
 * It includes many changes to core functionality of the game, as well as a few changes
 * to bring the source code up to date with modern JavaScript coding conventions.
 * CivClicker heavily inspired this game as I felt the UI was near perfect for the type of
 * game I wanted to make. I'm very grateful for David Holley making it open source as it
 * helped me immensely with understanding JavaScript, as well as the process of programming
 * an incremental idle game. Thank you for playing, and please check out CivClicker as well!
 * It's really an amazing game, and I hope this game at least somewhat lives up to it's inspiration.
 */

let ore = {
	name: 'ore',
	total: 0,
	increment: 1,
};
let ingot = {
	name: 'ingot',
	total: 0,
	increment: 1,
};
let coin = {
	name: 'coin',
	total: 0,
	increment: 1,
};
let money = {
	name: 'money',
	total: 0,
	increment: 1,
};
let orestock = {
	total: 0,
	require: {
		money: 100
	}
};
let ingotstock = {
	total: 0,
	require: {
		money: 100
	}
};
let coinstock = {
	total: 0,
	require: {
		money: 100
	}
};
let quarry = {
	total: 0,
	require: {
		money: 75
	}
};
let refinery = {
	total: 0,
	require: {
		money: 125
	}
};
let mint = {
	total: 0,
	require: {
		money: 175
	}
};
let skyscraper = {
	total: 0,
	require: {
		money: 225
	}
};
let employees = {
	current: 0,
	unassigned: 0,
	miners: 0,
	refiners: 0,
	minters: 0,
	marketers: 0,
};
let efficiency = {
	miners: 0.2,
	refiners: 0.2,
	minters: 0.2,
	marketers: 0.2,
};
let upgrades = {
	minerUpgrade1: 0,
	minerUpgrade2: 0,
	minerUpgrade3: 0,
	refinerUpgrade1: 0,
	refinerUpgrade2: 0,
	refinerUpgrade3: 0,
	minterUpgrade1: 0,
	minterUpgrade2: 0,
	minterUpgrade3: 0,
	marketerUpgrade1: 0,
	marketerUpgrade2: 0,
	marketerUpgrade3: 0,
	manualUpgrade1: 0,
	manualUpgrade2: 0,
};
let achievements = {
	tenClicks:0,
	hundredClicks:0,
	thousandClicks:0,
	tenThousandClicks:0,
	tenQuarries:0,
	hundredQuarries:0,
	tenRefineries:0,
	hundredRefineries:0,
	tenMints:0,
	hundredMints:0,
	tenSkyscrapers:0,
	hundredSkyscrapers:0,
	tenEmployees:0,
	hundredEmployees:0,
	thousandEmployees:0,
	sevenUpgrades:0,
	fourteenUpgrades:0,
};
let totalUpgrades = 0;
let resourceClicks = 0;
let logRepeat = 1;
let autosave = "on";
let autosaveCounter = 1;
let achievementBonus = 0;
let totalAchievements = 0;
let prestiges = 0;
let businessName = '';
let playerName = '';
let prestigeCost = 5000;

const body = document.getElementsByTagName('body')[0];


let loadString = "";

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		loadString = this.responseText;
		load();
	}
};
xhttp.open("GET","loadgame.php", true);
xhttp.send();


function load() {
	if (loadString === "") {
		businessName = prompt('Please name your business', '');
		document.getElementById('businessName').innerHTML = businessName;
		playerName = prompt('What is your name?', '');
		document.getElementById('playerName').innerHTML = playerName;
	} else {
		let loadVar = JSON.parse(loadString);

		ore.total = loadVar.ore.total;
		ingot.total = loadVar.ingot.total;
		coin.total = loadVar.coin.total;
		money.total = loadVar.money.total;
		orestock.total = loadVar.orestock.total;
		ingotstock.total = loadVar.ingotstock.total;
		coinstock.total = loadVar.coinstock.total;
		quarry.total = loadVar.quarry.total;
		refinery.total = loadVar.refinery.total;
		mint.total = loadVar.mint.total;
		skyscraper.total = loadVar.skyscraper.total;
		employees.current = loadVar.employees.current;
		employees.unassigned = loadVar.employees.unassigned;
		employees.miners = loadVar.employees.miners;
		employees.refiners = loadVar.employees.refiners;
		employees.minters = loadVar.employees.minters;
		employees.marketers = loadVar.employees.marketers;
		upgrades.minerUpgrade1 = loadVar.upgrades.minerUpgrade1;
		upgrades.minerUpgrade2 = loadVar.upgrades.minerUpgrade2;
		upgrades.minerUpgrade3 = loadVar.upgrades.minerUpgrade3;
		upgrades.refinerUpgrade1 = loadVar.upgrades.refinerUpgrade1;
		upgrades.refinerUpgrade2 = loadVar.upgrades.refinerUpgrade2;
		upgrades.refinerUpgrade3 = loadVar.upgrades.refinerUpgrade3;
		upgrades.minterUpgrade1 = loadVar.upgrades.minterUpgrade1;
		upgrades.minterUpgrade2 = loadVar.upgrades.minterUpgrade2;
		upgrades.minterUpgrade3 = loadVar.upgrades.minterUpgrade3;
		upgrades.marketerUpgrade1 = loadVar.upgrades.marketerUpgrade1;
		upgrades.marketerUpgrade2 = loadVar.upgrades.marketerUpgrade2;
		upgrades.marketerUpgrade3 = loadVar.upgrades.marketerUpgrade3;
		upgrades.manualUpgrade1 = loadVar.upgrades.manualUpgrade1;
		upgrades.manualUpgrade2 = loadVar.upgrades.manualUpgrade2;
		achievements.tenClicks = loadVar.achievements.tenClicks;
		achievements.hundredClicks = loadVar.achievements.hundredClicks;
		achievements.thousandClicks = loadVar.achievements.thousandClicks;
		achievements.tenThousandClicks = loadVar.achievements.tenThousandClicks;
		achievements.tenQuarries = loadVar.achievements.tenQuarries;
		achievements.hundredQuarries = loadVar.achievements.hundredQuarries;
		achievements.tenRefineries = loadVar.achievements.tenRefineries;
		achievements.hundredRefineries = loadVar.achievements.hundredRefineries;
		achievements.tenMints = loadVar.achievements.tenMints;
		achievements.hundredMints = loadVar.achievements.hundredMints;
		achievements.tenSkyscrapers = loadVar.achievements.tenSkyscrapers;
		achievements.hundredSkyscrapers = loadVar.achievements.hundredSkyscrapers;
		achievements.tenEmployees = loadVar.achievements.tenEmployees;
		achievements.hundredEmployees = loadVar.achievements.hundredEmployees;
		achievements.thousandEmployees = loadVar.achievements.thousandEmployees;
		achievements.sevenUpgrades = loadVar.achievements.sevenUpgrades;
		achievements.fourteenUpgrades = loadVar.achievements.fourteenUpgrades;
		totalUpgrades = loadVar.totalUpgrades;
		resourceClicks = loadVar.resourceClicks;
		businessName = loadVar.businessName;
		playerName = loadVar.playerName;
		totalAchievements = loadVar.totalAchievements;
		prestiges = loadVar.prestiges;
		prestigeCost = loadVar.prestigeCost;
	}

	updateResourceTotals();
	updateBuildingTotals();
	updateUpgrades();
	updateBuildingButtons();

	document.getElementById("clicks").innerHTML = prettify(Math.round(resourceClicks));
	document.getElementById('businessName').innerHTML = businessName;
	document.getElementById('playerName').innerHTML = playerName;
	document.getElementById('prestigeCost').innerHTML = prestigeCost;
	document.getElementById('totalPrestiges').innerHTML = prestiges;
	document.getElementById('totalUpgrades').innerHTML = totalUpgrades;
}



function updateResourceTotals() {
	document.getElementById('ore').innerHTML = prettify(Math.floor(ore.total));
	document.getElementById('ingot').innerHTML = prettify(Math.floor(ingot.total));
	document.getElementById('coin').innerHTML = prettify(Math.floor(coin.total));
	document.getElementById('money').innerHTML = prettify(Math.floor(money.total));

	let netOre = (employees.miners * efficiency.miners) - (employees.refiners * efficiency.refiners);
	let netIngot = (employees.refiners * efficiency.refiners) - (employees.minters * efficiency.minters);
	let netCoin = (employees.minters * efficiency.minters) - (employees.marketers * efficiency.marketers);
	let netMoney = (employees.marketers * efficiency.marketers) - (employees.current * 0.2);
	document.getElementById('netOre').innerHTML = prettify(netOre.toFixed(1));
	document.getElementById('netIngot').innerHTML = prettify(netIngot.toFixed(1));
	document.getElementById('netCoin').innerHTML = prettify(netCoin.toFixed(1));
	document.getElementById('netMoney').innerHTML = prettify(netMoney.toFixed(1));

	if (netOre < 0) {
		document.getElementById('netOre').style.color = '#f00';
	} else if (netOre == 0) {
		document.getElementById('netOre').style.color = '#000';
	} else {
		document.getElementById('netOre').style.color = '#0b0';
	}

	if (netIngot < 0) {
		document.getElementById('netIngot').style.color = '#f00';
	} else if (netIngot == 0) {
		document.getElementById('netIngot').style.color = '#000';
	} else {
		document.getElementById('netIngot').style.color = '#0b0';
	}

	if (netCoin < 0) {
		document.getElementById('netCoin').style.color = '#f00';
	} else if (netCoin == 0) {
		document.getElementById('netCoin').style.color = '#000';
	} else {
		document.getElementById('netCoin').style.color = '#0b0';
	}

	if (netMoney == 0) {
		document.getElementById('netMoney').style.color = '#000';
	} else {
		document.getElementById('netMoney').style.color = '#0b0';
	}
}

function updateBuildingTotals() {
	document.getElementById('orestock').innerHTML = prettify(orestock.total);
	document.getElementById('maxore').innerHTML = prettify(200 + (200 * orestock.total));

	document.getElementById('ingotstock').innerHTML = prettify(ingotstock.total);
	document.getElementById('maxingot').innerHTML = prettify(200 + (200 * ingotstock.total));

	document.getElementById('coinstock').innerHTML = prettify(coinstock.total);
	document.getElementById('maxcoin').innerHTML = prettify(200 + (200 * coinstock.total));

	document.getElementById('quarries').innerHTML = prettify(quarry.total);
	document.getElementById('refineries').innerHTML = prettify(refinery.total);
	document.getElementById('mints').innerHTML = prettify(mint.total);
	document.getElementById('skyscrapers').innerHTML = prettify(skyscraper.total);

	if (quarry.total > 0) document.getElementById('minergroup').style.display = 'table-row';
	if (refinery.total > 0) document.getElementById('refinergroup').style.display = 'table-row';
	if (mint.total > 0) document.getElementById('mintergroup').style.display = 'table-row';
	if (skyscraper.total > 0) document.getElementById('marketergroup').style.display = 'table-row';

	if (quarry.total == 10) achievements.tenQuarries = 1;
	if (quarry.total == 100) achievements.hundredQuarries = 1;
	if (refinery.total == 10) achievements.tenRefineries = 1;
	if (refinery.total == 100) achievements.hundredRefineries = 1;
	if (mint.total == 10) achievements.tenMints = 1;
	if (mint.total == 100) achievements.hundredMints = 1;
	if (skyscraper.total == 10) achievements.tenSkyscrapers = 1;
	if (skyscraper.total == 100) achievements.hundredSkyscrapers = 1;

	updateEmployees(); // TODO REMOVE
}

function updateEmployees() {
	employees.current = employees.unassigned + employees.miners + employees.refiners + employees.minters + employees.marketers;

	document.getElementById('employeesCurrent').innerHTML = prettify(employees.current);

	updateSpawnButtons();
	document.getElementById('employeeCost').innerHTML = prettify(calcCost(1));

	updateJobs(); // TODO REMOVE
}

function updateSpawnButtons() {
	if (money.total >= calcCost()) {
		document.getElementById('hire').disabled = false;
	} else {
		document.getElementById('hire').disabled = true;
	}
}

function updateJobs() {
	document.getElementById('unassigned').innerHTML = prettify(employees.unassigned);
	document.getElementById('miners').innerHTML = prettify(employees.miners);
	updateJobButtons('miners', 'miner', quarry, 1);
	document.getElementById('refiners').innerHTML = prettify(employees.refiners);
	updateJobButtons('refiners', 'refiner', refinery, 1);
	document.getElementById('minters').innerHTML = prettify(employees.minters);
	updateJobButtons('minters', 'minter', mint, 1);
	document.getElementById('marketers').innerHTML = prettify(employees.marketers);
	updateJobButtons('marketers', 'marketer', skyscraper, 1);

}

function updateJobButtons(job, name, building, support) {
	if (employees[job] > 0) {
		document.getElementById(name + 'group').children[0].children[0].disabled = false;
	} else {
		document.getElementById(name + 'group').children[0].children[0].disabled = true;
	}
	if (employees.unassigned >= 1 && employees[job] + 1 <= building.total * support) {
		document.getElementById(name + 'group').children[3].children[0].disabled = false;
	} else {
		document.getElementById(name + 'group').children[3].children[0].disabled = true;
	}
}

function updateUpgrades() {
	if (totalUpgrades == 7){
		achievements.sevenUpgrades = 1;
	} 
	if (totalUpgrades == 14){
		achievements.fourteenUpgrades = 1;
	} 
	if (upgrades.minerUpgrade1 == 1) {
		document.getElementById('minerUpgrade1Line').style.display = 'none';
		document.getElementById('PminerUpgrade1').style.display = 'block';
	} else {
		document.getElementById('minerUpgrade1Line').style.display = 'inline';
		document.getElementById('PminerUpgrade1').style.display = 'none';
		if (money.total >= 250) {
			document.getElementById('minerUpgrade1').disabled = false;
		} else {
			document.getElementById('minerUpgrade1').disabled = true;
		}
	}
	if (upgrades.minerUpgrade2 == 1) {
		document.getElementById('minerUpgrade2Line').style.display = 'none';
		document.getElementById('PminerUpgrade2').style.display = 'block';
	} else {
		document.getElementById('minerUpgrade2Line').style.display = 'inline';
		document.getElementById('PminerUpgrade2').style.display = 'none';
		if (money.total >= 500) {
			document.getElementById('minerUpgrade2').disabled = false;
		} else {
			document.getElementById('minerUpgrade2').disabled = true;
		}
	}
	if (upgrades.minerUpgrade3 == 1) {
		document.getElementById('minerUpgrade3Line').style.display = 'none';
		document.getElementById('PminerUpgrade3').style.display = 'block';
	} else {
		document.getElementById('minerUpgrade3Line').style.display = 'inline';
		document.getElementById('PminerUpgrade3').style.display = 'none';
		if (money.total >= 750) {
			document.getElementById('minerUpgrade3').disabled = false;
		} else {
			document.getElementById('minerUpgrade3').disabled = true;
		}
	}

	if (upgrades.refinerUpgrade1 == 1) {
		document.getElementById('refinerUpgrade1Line').style.display = 'none';
		document.getElementById('PrefinerUpgrade1').style.display = 'block';
	} else {
		document.getElementById('refinerUpgrade1Line').style.display = 'inline';
		document.getElementById('PrefinerUpgrade1').style.display = 'none';
		if (money.total >= 250) {
			document.getElementById('refinerUpgrade1').disabled = false;
		} else {
			document.getElementById('refinerUpgrade1').disabled = true;
		}
	}
	if (upgrades.refinerUpgrade2 == 1) {
		document.getElementById('refinerUpgrade2Line').style.display = 'none';
		document.getElementById('PrefinerUpgrade2').style.display = 'block';
	} else {
		document.getElementById('refinerUpgrade2Line').style.display = 'inline';
		document.getElementById('PrefinerUpgrade2').style.display = 'none';
		if (money.total >= 500) {
			document.getElementById('refinerUpgrade2').disabled = false;
		} else {
			document.getElementById('refinerUpgrade2').disabled = true;
		}
	}
	if (upgrades.refinerUpgrade3 == 1) {
		document.getElementById('refinerUpgrade3Line').style.display = 'none';
		document.getElementById('PrefinerUpgrade3').style.display = 'block';
	} else {
		document.getElementById('refinerUpgrade3Line').style.display = 'inline';
		document.getElementById('PrefinerUpgrade3').style.display = 'none';
		if (money.total >= 750) {
			document.getElementById('refinerUpgrade3').disabled = false;
		} else {
			document.getElementById('refinerUpgrade3').disabled = true;
		}
	}

	if (upgrades.minterUpgrade1 == 1) {
		document.getElementById('minterUpgrade1Line').style.display = 'none';
		document.getElementById('PminterUpgrade1').style.display = 'block';
	} else {
		document.getElementById('minterUpgrade1Line').style.display = 'inline';
		document.getElementById('PminterUpgrade1').style.display = 'none';
		if (money.total >= 250) {
			document.getElementById('minterUpgrade1').disabled = false;
		} else {
			document.getElementById('minterUpgrade1').disabled = true;
		}
	}
	if (upgrades.minterUpgrade2 == 1) {
		document.getElementById('minterUpgrade2Line').style.display = 'none';
		document.getElementById('PminterUpgrade2').style.display = 'block';
	} else {
		document.getElementById('minterUpgrade2Line').style.display = 'inline';
		document.getElementById('PminterUpgrade2').style.display = 'none';
		if (money.total >= 500) {
			document.getElementById('minterUpgrade2').disabled = false;
		} else {
			document.getElementById('minterUpgrade2').disabled = true;
		}
	}
	if (upgrades.minterUpgrade3 == 1) {
		document.getElementById('minterUpgrade3Line').style.display = 'none';
		document.getElementById('PminterUpgrade3').style.display = 'block';
	} else {
		document.getElementById('minterUpgrade3Line').style.display = 'inline';
		document.getElementById('PminterUpgrade3').style.display = 'none';
		if (money.total >= 750) {
			document.getElementById('minterUpgrade3').disabled = false;
		} else {
			document.getElementById('minterUpgrade3').disabled = true;
		}
	}

	if (upgrades.marketerUpgrade1 == 1) {
		document.getElementById('marketerUpgrade1Line').style.display = 'none';
		document.getElementById('PmarketerUpgrade1').style.display = 'block';
	} else {
		document.getElementById('marketerUpgrade1Line').style.display = 'inline';
		document.getElementById('PmarketerUpgrade1').style.display = 'none';
		if (money.total >= 250) {
			document.getElementById('marketerUpgrade1').disabled = false;
		} else {
			document.getElementById('marketerUpgrade1').disabled = true;
		}
	}
	if (upgrades.marketerUpgrade2 == 1) {
		document.getElementById('marketerUpgrade2Line').style.display = 'none';
		document.getElementById('PmarketerUpgrade2').style.display = 'block';
	} else {
		document.getElementById('marketerUpgrade2Line').style.display = 'inline';
		document.getElementById('PmarketerUpgrade2').style.display = 'none';
		if (money.total >= 500) {
			document.getElementById('marketerUpgrade2').disabled = false;
		} else {
			document.getElementById('marketerUpgrade2').disabled = true;
		}
	}
	if (upgrades.marketerUpgrade3 == 1) {
		document.getElementById('marketerUpgrade3Line').style.display = 'none';
		document.getElementById('PmarketerUpgrade3').style.display = 'block';
	} else {
		document.getElementById('marketerUpgrade3Line').style.display = 'inline';
		document.getElementById('PmarketerUpgrade3').style.display = 'none';
		if (money.total >= 750) {
			document.getElementById('marketerUpgrade3').disabled = false;
		} else {
			document.getElementById('marketerUpgrade3').disabled = true;
		}
	}

	if (upgrades.manualUpgrade1 == 1) {
		document.getElementById('manualUpgrade1Line').style.display = 'none';
		document.getElementById('PmanualUpgrade1').style.display = 'block';
	} else {
		document.getElementById('manualUpgrade1Line').style.display = 'inline';
		document.getElementById('PmanualUpgrade1').style.display = 'none';
		if (money.total >= 5000) {
			document.getElementById('manualUpgrade1').disabled = false;
		} else {
			document.getElementById('manualUpgrade1').disabled = true;
		}
	}
	if (upgrades.manualUpgrade2 == 1) {
		document.getElementById('manualUpgrade2Line').style.display = 'none';
		document.getElementById('PmanualUpgrade2').style.display = 'block';
	} else {
		document.getElementById('manualUpgrade2Line').style.display = 'inline';
		document.getElementById('PmanualUpgrade2').style.display = 'none';
		if (money.total >= 10000) {
			document.getElementById('manualUpgrade2').disabled = false;
		} else {
			document.getElementById('manualUpgrade2').disabled = true;
		}
	}
}

function updateBuildingButtons() {
	updateBuildingRow(orestock, 'orestock');
	updateBuildingRow(ingotstock, 'ingotstock');
	updateBuildingRow(coinstock, 'coinstock');
	updateBuildingRow(quarry, 'quarry');
	updateBuildingRow(refinery, 'refinery');
	updateBuildingRow(mint, 'mint');
	updateBuildingRow(skyscraper, 'skyscraper');
}

function updateBuildingRow(building, name) {
	if (money.total >= building.require.money) {
		document.getElementById(name + 'Row').children[0].children[0].disabled = false;
	} else {
		document.getElementById(name + 'Row').children[0].children[0].disabled = true;
	}
}


function increment(material) {
	resourceClicks += 1;
	if (resourceClicks == 10){
		achievements.tenClicks = 1;
	} 
	if (resourceClicks == 100){
		achievements.hundredClicks = 1;
	} 
	if (resourceClicks == 1000) {
		achievements.thousandClicks = 1;
	}
	if (resourceClicks == 10000){
		achievements.tenThousandClicks = 1;
	} 
	document.getElementById("clicks").innerHTML = prettify(Math.round(resourceClicks));

	let incrementAmount = (material.increment + prestiges) + ((material.increment + prestiges) * 9 * upgrades.manualUpgrade1) + ((material.increment + prestiges) * 40 * upgrades.manualUpgrade2);

	if (material == ore) {
		material.total += incrementAmount;
	} else if (material == ingot && ore.total > 0 && ingot.total + incrementAmount <= 200 + (ingotstock.total * 200)) {
		material.total += incrementAmount;
		ore.total -= 1;
	} else if (material == coin && ingot.total > 0 && coin.total + incrementAmount <= 200 + (coinstock.total * 200)) {
		material.total += incrementAmount;
		ingot.total -= 1;
	} else if (material == money && coin.total > 0) {
		material.total += incrementAmount;
		coin.total -= 1;
	}

	if (ore.total > 200 + (orestock.total * 200)) {
		ore.total = 200 + (orestock.total * 200);
	}
	if (ingot.total > 200 + (ingotstock.total * 200)) {
		ingot.total = 200 + (ingotstock.total * 200);
	}
	if (coin.total > 200 + (coinstock.total * 200)) {
		coin.total = 200 + (coinstock.total * 200);
	}
	updateSpawnButtons();
	updateResourceTotals();
	updateIncrementButtons();
}

function updateIncrementButtons() {
	if (ore.total >= 1) {
		document.getElementById('ingotRow').children[0].children[0].disabled = false;
	} else {
		document.getElementById('ingotRow').children[0].children[0].disabled = true;
	}
	if (ingot.total >= 1) {
		document.getElementById('coinRow').children[0].children[0].disabled = false;
	} else {
		document.getElementById('coinRow').children[0].children[0].disabled = true;
	}
	if (coin.total >= 1) {
		document.getElementById('moneyRow').children[0].children[0].disabled = false;
	} else {
		document.getElementById('moneyRow').children[0].children[0].disabled = true;
	}
}

function createBuilding(building) {
	if (money.total >= building.require.money) {
		money.total = money.total - building.require.money;
		building.total += 1;

		updateBuildingButtons(); //Update the buttons themselves
		updateResourceTotals(); //Update page with lower resource values
		updateBuildingTotals(); //Update page with higher building total
		updateJobs();
	} else {
		gameLog("Could not build, insufficient money.");
	}
}

function calcCost() {
	return 20 + Math.floor(employees.current / 100);
}

function spawn() {
	var totalCost = calcCost();
	if (money.total >= totalCost) {
		employees.current += 1;
		if (employees.current == 10) {
			achievements.tenEmployees = 1;
		}	
		if (employees.current == 100){
			achievements.hundredEmployees = 1;
		}
		if (employees.current == 1000) {
			achievements.thousandEmployees = 1;
		}
		if (employees.current == 10000){
			achievements.tenThousandEmployees = 1;
		}
		employees.unassigned += 1;
		money.total -= totalCost;
		updateResourceTotals();
		updateEmployees();
	}
}

function hire(job) {
	if (job == 'miners' && employees.unassigned > 0 && quarry.total >= (employees.miners + 1)) {
		employees.miners += 1;
		employees.unassigned -= 1;
	}
	if (job == 'refiners' && employees.unassigned > 0 && refinery.total >= (employees.refiners + 1)) {
		employees.refiners += 1;
		employees.unassigned -= 1;
	}
	if (job == 'minters' && employees.unassigned > 0 && mint.total >= (employees.minters + 1)) {
		employees.minters += 1;
		employees.unassigned -= 1;
	}
	if (job == 'marketers' && employees.unassigned > 0 && skyscraper.total >= (employees.marketers + 1)) {
		employees.marketers += 1;
		employees.unassigned -= 1;
	}
	updateJobs();
}

function fire(job) {
	//See above hire() function, works the same way but in reverse.
	//May also be possible to consolidate with hire function, by hiring negative numbers. Will investigate.
	if (job == 'miners' && employees.miners > 0) {
		employees.miners -= 1;
		employees.unassigned += 1;
	}
	if (job == 'refiners' && employees.refiners > 0) {
		employees.refiners -= 1;
		employees.unassigned += 1;
	}
	if (job == 'minters' && employees.minters > 0) {
		employees.minters -= 1;
		employees.unassigned += 1;
	}
	if (job == 'marketers' && employees.marketers > 0) {
		employees.marketers -= 1;
		employees.unassigned += 1;
	}
	updateJobs();
}

function upgrade(name) {
	if (name == 'minerUpgrade1' && money.total >= 250) {
		upgrades.minerUpgrade1 = 1;
		totalUpgrades++;
		money.total -= 250;
		efficiency.miners += 0.1;
	}
	if (name == 'minerUpgrade2' && money.total >= 500) {
		upgrades.minerUpgrade2 = 1;
		totalUpgrades++;
		money.total -= 500;
		efficiency.miners += 0.1;
	}
	if (name == 'minerUpgrade3' && money.total >= 750) {
		upgrades.minerUpgrade3 = 1;
		totalUpgrades++;
		money.total -= 750;
		efficiency.miners += 0.1;
	}

	if (name == 'refinerUpgrade1' && money.total >= 250) {
		upgrades.refinerUpgrade1 = 1;
		totalUpgrades++;
		money.total -= 250;
		efficiency.refiners += 0.1;
	}
	if (name == 'refinerUpgrade2' && money.total >= 500) {
		upgrades.refinerUpgrade2 = 1;
		totalUpgrades++;
		money.total -= 500;
		efficiency.refiners += 0.1;
	}
	if (name == 'refinerUpgrade3' && money.total >= 750) {
		upgrades.refinerUpgrade3 = 1;
		totalUpgrades++;
		money.total -= 750;
		efficiency.refiners += 0.1;
	}

	if (name == 'minterUpgrade1' && money.total >= 250) {
		upgrades.minterUpgrade1 = 1;
		totalUpgrades++;
		money.total -= 250;
		efficiency.minters += 0.1;
	}
	if (name == 'minterUpgrade2' && money.total >= 500) {
		upgrades.minterUpgrade2 = 1;
		totalUpgrades++;
		money.total -= 500;
		efficiency.minters += 0.1;
	}
	if (name == 'minterUpgrade3' && money.total >= 750) {
		upgrades.minterUpgrade3 = 1;
		totalUpgrades++;
		money.total -= 750;
		efficiency.minters += 0.1;
	}

	if (name == 'marketerUpgrade1' && money.total >= 250) {
		upgrades.marketerUpgrade1 = 1;
		totalUpgrades++;
		money.total -= 250;
		efficiency.marketers += 0.1;
	}
	if (name == 'marketerUpgrade2' && money.total >= 500) {
		upgrades.marketerUpgrade2 = 1;
		totalUpgrades++;
		money.total -= 500;
		efficiency.marketers += 0.1;
	}
	if (name == 'marketerUpgrade3' && money.total >= 750) {
		upgrades.marketerUpgrade3 = 1;
		totalUpgrades++;
		money.total -= 750;
		efficiency.marketers += 0.1;
	}

	if (name == 'manualUpgrade1' && money.total >= 5000) {
		upgrades.manualUpgrade1 = 1;
		totalUpgrades++;
		money.total -= 5000;
	}
	if (name == 'manualUpgrade2' && money.total >= 10000) {
		upgrades.manualUpgrade2 = 1;
		totalUpgrades++;
		money.total -= 10000;
	}

	document.getElementById('totalUpgrades').innerHTML = totalUpgrades;

	updateEfficiency();
	updateUpgrades(); //Update which upgrades are available to the player
	updateResourceTotals(); //Update reduced resource totals as appropriate.
}

function updateEfficiency() {
	efficiency.miners = 0.2 + (0.1 * upgrades.minerUpgrade1) + (0.1 * upgrades.minerUpgrade2) + (0.1 * upgrades.minerUpgrade3) + (0.1 * prestiges) + (0.01 * totalAchievements);;
	efficiency.refiners = 0.2 + (0.1 * upgrades.refinerUpgrade1) + (0.1 * upgrades.refinerUpgrade2) + (0.1 * upgrades.refinerUpgrade3) + (0.1 * prestiges) +(0.01 * totalAchievements);;
	efficiency.minters = 0.2 + (0.1 * upgrades.minterUpgrade1) + (0.1 * upgrades.minterUpgrade2) + (0.1 * upgrades.minterUpgrade3) + (0.1 * prestiges) + (0.01 * totalAchievements);;
	efficiency.marketers = 0.2 + (0.1 * upgrades.marketerUpgrade1) + (0.1 * upgrades.marketerUpgrade2) + (0.1 * upgrades.marketerUpgrade3) + (0.1 * prestiges) + (0.01 * totalAchievements);
}

function save(savetype) {
	let saveVar = {
		ore: ore,
		ingot: ingot,
		coin: coin,
		money: money,
		employees: employees,
		efficiency: efficiency,
		upgrades: upgrades,
		businessName: businessName,
		playerName: playerName,
		orestock: orestock,
		ingotstock: ingotstock,
		coinstock: coinstock,
		quarry: quarry,
		refinery: refinery,
		mint: mint,
		skyscraper: skyscraper,
		achievements: achievements,
		totalUpgrades: totalUpgrades,
		resourceClicks: resourceClicks,
		prestiges: prestiges,
		totalAchievements: totalAchievements,
		prestigeCost: prestigeCost
	}

	let saveString = JSON.stringify(saveVar);
	if (savetype == 'auto') {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", "savegame.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/json");
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				gameLog('Autosaved');
			}
		};
    	xmlhttp.send(saveString);
	} else if (savetype == 'manual') {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", "savegame.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/json");
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				alert('Game Saved');
				gameLog('Saved game');
			}
		};
		xmlhttp.send(saveString);
	}
}

function deleteSave() {
	//Deletes the current savegame by setting the game's cookies to expire in the past.
	var really = confirm('Really delete save?'); //Check the player really wanted to do that.
	if (really) {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","savegame.php?s=",true);
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				location.reload();
			}
		};
    	xmlhttp.send();
	}
}

function renameBusiness() {
	n = prompt('Please name your business', businessName);
	if (n != null) {
		businessName = n;
		document.getElementById('businessName').innerHTML = businessName;
	}
}
function renamePlayer() {
	n = prompt('What is your name?', playerName);
	if (n != null) {
		playerName = n;
		document.getElementById('playerName').innerHTML = playerName;
	}
}

window.setInterval(function () {
	autosaveCounter += 1;
	if (autosaveCounter >= 60) {
		save('auto');
		autosaveCounter = 1;
	}

	ore.total += employees.miners * efficiency.miners;

	if (ore.total > employees.refiners && ingot.total + employees.refiners * efficiency.refiners <= 200 + (orestock.total * 200)) {
		ingot.total += employees.refiners * efficiency.refiners;
		ore.total -= employees.refiners * efficiency.refiners;
	}

	if (ingot.total > employees.minters && coin.total + employees.minters * efficiency.minters <= 200 + (coinstock.total * 200)) {
		coin.total += employees.minters * efficiency.minters;
		ingot.total -= employees.minters * efficiency.minters;
	}

	if (coin.total > employees.marketers) {
		money.total += employees.marketers * efficiency.marketers;
		coin.total -= employees.marketers * efficiency.marketers;
	}

	money.total -= employees.current * 0.2;

	if (ore.total > 200 + (orestock.total * 200)) {
		ore.total = 200 + (orestock.total * 200);
	}
	if (ingot.total > 200 + (ingotstock.total * 200)) {
		ingot.total = 200 + (ingotstock.total * 200);
	}
	if (coin.total > 200 + (coinstock.total * 200)) {
		coin.total = 200 + (coinstock.total * 200);
	}

	updateResourceTotals(); //This is the point where the page is updated with new resource totals

	updateUpgrades();
	updateBuildingButtons();
	updateIncrementButtons();
	updateJobs();
	updateSpawnButtons();
	updateAchievements();

}, 1000);


function paneSelect(name) {
	if (name == 'buildings') {
		document.getElementById("buildingsPane").style.display = "block";
		document.getElementById("upgradesPane").style.display = "none";
		document.getElementById("selectBuildings").className = "paneSelector selected";
		document.getElementById("selectUpgrades").className = "paneSelector";
	}
	if (name == 'upgrades') {
		document.getElementById("buildingsPane").style.display = "none";
		document.getElementById("upgradesPane").style.display = "block";
		document.getElementById("selectBuildings").className = "paneSelector";
		document.getElementById("selectUpgrades").className = "paneSelector selected";
	}
}

function prettify(input) {
	var output = '';
	output = input.toString();
	var characteristic = '', //the bit that comes before the decimal point
		mantissa = '', //the bit that comes afterwards
		digitCount = 0;
	let delimiter = "&#8239;"; //thin space is the ISO standard thousands delimiter. we need a non-breaking version

	//first split the string on the decimal point, and assign to the characteristic and mantissa
	var parts = output.split('.');
	if (typeof parts[1] === 'string') var mantissa = '.' + parts[1]; //check it's defined first, and tack a decimal point to the start of it

	//then insert the commas in the characteristic
	var charArray = parts[0].split(""); //breaks it into an array
	for (var i = charArray.length; i > 0; i--) { //counting backwards through the array
		characteristic = charArray[i - 1] + characteristic; //add the array item at the front of the string
		digitCount++;
		if (digitCount == 3 && i != 1) { //once every three digits (but not at the head of the number)
			characteristic = delimiter + characteristic; //add the delimiter at the front of the string
			digitCount = 0;
		}
	}
	output = characteristic + mantissa; //reassemble the number
	return output;
}

function gameLog(message) {
	let time = '0.00';
	let d = new Date();
	if (d.getMinutes() < 10) {
		time = d.getHours() + ".0" + d.getMinutes();
	} else {
		time = d.getHours() + "." + d.getMinutes();
	}
	if (document.getElementById('logL').innerHTML == message) {
		logRepeat += 1;
		document.getElementById('log0').innerHTML = '<td id="logT">' + time + '</td><td id="logL">' + message + '</td><td id="logR">(x' + logRepeat + ')</td>';
	} else {
		logRepeat = 1
		document.getElementById('log4').innerHTML = document.getElementById('log3').innerHTML
		document.getElementById('log3').innerHTML = document.getElementById('log2').innerHTML
		document.getElementById('log2').innerHTML = document.getElementById('log1').innerHTML
		document.getElementById('log1').innerHTML = '<td>' + document.getElementById('logT').innerHTML + '</td><td>' + document.getElementById('logL').innerHTML + '</td><td>' + document.getElementById('logR').innerHTML + '</td>';
		document.getElementById('log0').innerHTML = '<td id="logT">' + time + '</td><td id="logL">' + message + '</td><td id="logR">(x' + logRepeat + ')</td>';
	}
}

function updateAchievements(){
	// clicks
	if (achievements.tenClicks) document.getElementById('achTenClicks').style.display = "block";
	if (achievements.hundredClicks) document.getElementById('achHundredClicks').style.display = "block";
	if (achievements.thousandClicks) document.getElementById('achThousandClicks').style.display = "block";
	if (achievements.tenThousandClicks) document.getElementById('achTenThousandClicks').style.display = "block";
	// buildings
	if (achievements.tenQuarries) document.getElementById('achTenQuarries').style.display = "block";
	if (achievements.hundredQuarries) document.getElementById('achHundredQuarries').style.display = "block";
	if (achievements.tenRefineries) document.getElementById('achTenRefineries').style.display = "block";
	if (achievements.hundredRefineries) document.getElementById('achHundredRefineries').style.display = "block";
	if (achievements.tenMints) document.getElementById('achTenMints').style.display = "block";
	if (achievements.hundredMints) document.getElementById('achHundredMints').style.display = "block";
	if (achievements.tenSkyscrapers) document.getElementById('achTenSkyscrapers').style.display = "block";
	if (achievements.hundredSkyscrapers) document.getElementById('achHundredSkyscrapers').style.display = "block";
	// employees
	if (achievements.tenEmployees) document.getElementById('achTenEmployees').style.display = "block";
	if (achievements.hundredEmployees) document.getElementById('achHundredEmployees').style.display = "block";
	if (achievements.thousandEmployees) document.getElementById('achThousandEmployees').style.display = "block";
	// upgrades
	if (achievements.sevenUpgrades) document.getElementById('achSevenUpgrades').style.display = "block";
	if (achievements.fourteenUpgrades) document.getElementById('achFourteenUpgrades').style.display = "block";

	totalAchievements = achievements.tenClicks +
		achievements.hundredClicks +
		achievements.thousandClicks +
		achievements.tenThousandClicks +
		achievements.tenQuarries +
		achievements.hundredQuarries +
		achievements.tenRefineries +
		achievements.hundredRefineries +
		achievements.tenMints +
		achievements.hundredMints +
		achievements.tenSkyscrapers +
		achievements.hundredSkyscrapers +
		achievements.tenEmployees +
		achievements.hundredEmployees +
		achievements.thousandEmployees +
		achievements.sevenUpgrades +
		achievements.fourteenUpgrades;
}

function prestige() {
	if (money.total > prestigeCost) {
		ore.total = 0;
		ingot.total = 0;
		coin.total = 0;
		money.total = 0;
		orestock.total = 0;
		ingotstock.total = 0;
		coinstock.total = 0;
		quarry.total = 0;
		refinery.total = 0;
		mint.total = 0;
		skyscraper.total = 0;
		employees.current = 0;
		employees.unassigned = 0;
		employees.miners = 0;
		employees.refiners = 0;
		employees.minters = 0;
		employees.marketers = 0;
		upgrades.minerUpgrade1 = 0;
		upgrades.minerUpgrade2 = 0;
		upgrades.minerUpgrade3 = 0;
		upgrades.refinerUpgrade1 = 0;
		upgrades.refinerUpgrade2 = 0;
		upgrades.refinerUpgrade3 = 0;
		upgrades.minterUpgrade1 = 0;
		upgrades.minterUpgrade2 = 0;
		upgrades.minterUpgrade3 = 0;
		upgrades.marketerUpgrade1 = 0;
		upgrades.marketerUpgrade2 = 0;
		upgrades.marketerUpgrade3 = 0;
		upgrades.manualUpgrade1 = 0;
		upgrades.manualUpgrade2 = 0;
		totalUpgrades = 0;
		prestiges++;

		updateResourceTotals();
		updateBuildingTotals();
		updateUpgrades();
		updateBuildingButtons();

		prestigeCost = 2 * prestigeCost;

		document.getElementById('prestigeCost').innerHTML = prestigeCost;
		document.getElementById('totalPrestiges').innerHTML = prestiges;

		save('manual');
	}
}