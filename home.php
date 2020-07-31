<?php
session_start();
if (!isset($_SESSION['loggedin'])) {
	header("Location: index.php");
	exit();
}
?>

<!DOCTYPE html>
<!--
	CivClicker
	Copyright (C) 2014 David Holley

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program (if you are reading this on the original
	author's website, you can find a copy at <http://dhmholley.co.uk/gpl.txt>). 
	If not, see <http://www.gnu.org/licenses/>.

	This file modified by William Pirtle
  	wpirtle2@student.gsu.edu
	CSC 4821 at Georgia State University
	 
	This file was modified to the specifications needed for my semester project
	Gold Generator.

	This file was mostly removing/renaming things to fit the project's needs. Most
	of the UI remains the same, but with some additions and changes to fit Gold Generator's
	design. See GoldGenerator.js for a more detailed comment about my changes.
-->
<html lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<title>Gold Generator (v1.0)</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="styles/GoldGenerator.css">
	
</head>
<body>

<div id="header">
	<h1><span id="businessName">Test</span> Inc.</h1>
	<div id="player">Owned and operated by <span id="playerName">Wil</span></div>
	<div style="clear:both;"></div>

	<a href="logout.php">Logout</a>
</div>

<div id="materials">
	<div id="materialsContainer">
		<div id="basicMaterialsContainer">
			<h3>Basic Resources</h3>
			<table id="basicMaterials">
				<tbody><tr>
					<td><button onmousedown="increment(ore)">Gather Ore</button></td>
					<td>Ore: </td>
					<td class="number"><span id="ore">0</span></td>
					<td class="icon"><img src="images/ore.png" class="icon icon-lg" alt="Ore"></td>
					<td class="number">(Max storage: <span id="maxore">200</span>)</td>
					<td class="number net"><span id="netOre" style="color: rgb(0, 187, 0);">0.2</span>/s</td>
				</tr>
				<tr id="ingotRow">
					<td><button onmousedown="increment(ingot)">Smelt Ingots</button></td>
					<td>Ingots: </td>
					<td class="number"><span id="ingot">0</span></td>
					<td class="icon"><img src="images/ingot.png" class="icon icon-lg" alt="Ingots"></td>
					<td class="number">(Max storage: <span id="maxingot">200</span>)</td>
					<td class="number net"><span id="netIngot" style="color: rgb(0, 0, 0);">0.0</span>/s</td>
				</tr>
				<tr id="coinRow">
					<td><button onmousedown="increment(coin)">Mint Coins</button></td>
					<td>Coins: </td>
					<td class="number"><span id="coin">0</span></td>
					<td class="icon"><img src="images/coin.png" class="icon icon-lg" alt="Coins"></td>
					<td class="number">(Max storage: <span id="maxcoin">200</span>)</td>
					<td class="number net"><span id="netCoin" style="color: rgb(0, 0, 0);">0.0</span>/s</td>
				</tr>
				<tr id="moneyRow">
					<td><button onmousedown="increment(money)">Sell Coins</button></td>
					<td>Goldar: </td>
					<td class="number"><span id="money">0</span></td>
					<td class="icon"><img src="images/money.png" class="icon icon-lg" alt="Money"></td>
					<td></td>
					<td class="number net"><span id="netMoney" style="color: rgb(0, 0, 0);">0.0</span>/s</td>
				</tr>
			</tbody></table>
		</div>
	</div>
	<div id="panesSelectors">
		<div id="selectors">
			<div id="selectBuildings" class="paneSelector selected" onclick="paneSelect('buildings')">Buildings</div>
			<div id="selectUpgrades" class="paneSelector" onclick="paneSelect('upgrades')">Upgrades</div>
			<div style="clear:both;"></div>
		</div>
		
		<div id="buildingsPane">
		<h3>Buildings</h3>
			<table id="buildings">
				<tbody><tr id="orestockRow">
					<td><button onmousedown="createBuilding(orestock)" disabled="disabled">Build Ore Stockpile</button></td>
					<td class="buildingnames">Ore Stockpiles: </td>
					<td class="number"><span id="orestock">0</span></td>
					<td><span class="cost">100 goldar</span><span class="note">: store +200 ore</span></td>
				</tr>
				<tr id="ingotstockRow">
					<td><button onmousedown="createBuilding(ingotstock)" disabled="disabled">Build Ingot Stockpile</button></td>
					<td class="buildingnames">Ingot Stockpiles: </td>
					<td class="number"><span id="ingotstock">0</span></td>
					<td><span class="cost">100 goldar</span><span class="note">: store +200 ingots</span></td>
				</tr>
				<tr id="coinstockRow">
					<td><button onmousedown="createBuilding(coinstock)" disabled="disabled">Build Coin Stockpile</button></td>
					<td class="buildingnames">Coin Stockpiles: </td>
					<td class="number"><span id="coinstock">0</span></td>
					<td><span class="cost">100 goldar</span><span class="note">: store +200 coins</span></td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr id="quarryRow">
					<td><button onmousedown="createBuilding(quarry)" disabled="disabled">Build Quarry</button></td>
					<td class="buildingnames">Quarries: </td>
					<td class="number"><span id="quarries">0</span></td>
					<td><span class="cost">75 goldar</span><span class="note">: allow 1 miner</span></td>
				</tr>
				<tr id="refineryRow">
					<td><button onmousedown="createBuilding(refinery)" disabled="disabled">Build Refinery</button></td>
					<td class="buildingnames">Refineries: </td>
					<td class="number"><span id="refineries">0</span></td>
					<td><span class="cost">125 goldar</span><span class="note">: allow 1 refiner</span></td>
				</tr>
				<tr id="mintRow">
					<td><button onmousedown="createBuilding(mint)" disabled="disabled">Build Mint</button></td>
					<td class="buildingnames">Mints: </td>
					<td class="number"><span id="mints">0</span></td>
					<td><span class="cost">175 goldar</span><span class="note">: allow 1 minter</span></td>
				</tr>
				<tr id="skyscraperRow">
					<td><button onmousedown="createBuilding(skyscraper)" disabled="disabled">Build Skyscraper</button></td>
					<td class="buildingnames">Skyscraper: </td>
					<td class="number"><span id="skyscrapers">0</span></td>
					<td><span class="cost">225 goldar</span><span class="note">: allow 1 marketer</span></td>
				</tr>
			</tbody></table>
		</div>
		
		<div id="upgradesPane">
		<h3>Upgrades</h3>
			<div id="minerUpgrades">
				<span id="minerUpgrade1Line" style="display: inline;"><button id="minerUpgrade1" onmousedown="upgrade('minerUpgrade1')" disabled="disabled">Bronze Pickaxes<br>(250 goldar)</button><span class="note">Increase miner ore output</span><br></span>
				<span id="minerUpgrade2Line" style="display: inline;"><button id="minerUpgrade2" onmousedown="upgrade('minerUpgrade2')" disabled="disabled">Steel Pickaxes<br>(500 goldar)</button><span class="note">Further increase miner ore output</span><br></span>
				<span id="minerUpgrade3Line" style="display: inline;"><button id="minerUpgrade3" onmousedown="upgrade('minerUpgrade3')" disabled="disabled">Industrial Drills<br>(750 goldar)</button><span class="note">Maximize miner ore output</span><br><br></span>
			</div>
			<div id="refinerUpgrades">
				<span id="refinerUpgrade1Line" style="display: inline;"><button id="refinerUpgrade1" onmousedown="upgrade('refinerUpgrade1')" disabled="disabled">Stone Forges<br>(250 goldar)</button><span class="note">Increase refiner ingot output</span><br></span>
				<span id="refinerUpgrade2Line" style="display: inline;"><button id="refinerUpgrade2" onmousedown="upgrade('refinerUpgrade2')" disabled="disabled">Steel Furnaces<br>(500 goldar)</button><span class="note">Further increase refiner ingot output</span><br></span>
				<span id="refinerUpgrade3Line" style="display: inline;"><button id="refinerUpgrade3" onmousedown="upgrade('refinerUpgrade3')" disabled="disabled">Industrial Smelters<br>(750 goldar)</button><span class="note">Maximize refiner ingot output</span><br><br></span>
			</div>
			<div id="minterUpgrades">
				<span id="minterUpgrade1Line" style="display: inline;"><button id="minterUpgrade1" onmousedown="upgrade('minterUpgrade1')" disabled="disabled">Basic Automated Mints<br>(250 goldar)</button><span class="note">Increase minter coin output</span><br></span>
				<span id="minterUpgrade2Line" style="display: inline;"><button id="minterUpgrade2" onmousedown="upgrade('minterUpgrade2')" disabled="disabled">Fully Automated Mints<br>(500 goldar)</button><span class="note">Further increase minter coin output</span><br></span>
				<span id="minterUpgrade3Line" style="display: inline;"><button id="minterUpgrade3" onmousedown="upgrade('minterUpgrade3')" disabled="disabled">AI Operated Mints<br>(750 goldar)</button><span class="note">Maximize minter coin output</span><br><br></span>
			</div>
			<div id="marketerUpgrades">
				<span id="marketerUpgrade1Line" style="display: inline;"><button id="marketerUpgrade1" onmousedown="upgrade('marketerUpgrade1')" disabled="disabled">Smooth Talking<br>(250 goldar)</button><span class="note">Increase marketer goldar output</span><br></span>
				<span id="marketerUpgrade2Line" style="display: inline;"><button id="marketerUpgrade2" onmousedown="upgrade('marketerUpgrade2')" disabled="disabled">Corporate Connections<br>(500 goldar)</button><span class="note">Further increase marketer goldar output</span><br></span>
				<span id="marketerUpgrade3Line" style="display: inline;"><button id="marketerUpgrade3" onmousedown="upgrade('marketerUpgrade3')" disabled="disabled">International Trading<br>(750 goldar)</button><span class="note">Maximize marketer goldar output</span><br><br></span>
			</div>
			<div id="manualUpgrades">
				<span id="manualUpgrade1Line" style="display: inline;"><button id="manualUpgrade1" onmousedown="upgrade('manualUpgrade1')" disabled="disabled">Knowledgable CEO<br>(5,000 goldar)</button><span class="note">Increases resources gained by clicking</span><br></span>
				<span id="manualUpgrade2Line" style="display: inline;"><button id="manualUpgrade2" onmousedown="upgrade('manualUpgrade2')" disabled="disabled">Best CEO World<br>(10,000 goldar)</button><span class="note">Maximize resources gained by clicking</span><br></span>
			</div>
			<h3>Purchased Upgrades</h3>
			<div id="purchased">
				<span id="PminerUpgrade1" style="display: none;"><b>Bronze Pickaxes</b> - Increase miner ore output</span>
				<span id="PminerUpgrade2" style="display: none;"><b>Steel Pickaxes</b> - Further increase miner ore output</span>
				<span id="PminerUpgrade3" style="display: none;"><b>Industrial Drills</b> - Maximize miner ore output</span>
				<span id="PrefinerUpgrade1" style="display: none;"><b>Stone Forges</b> - Increase refiner ingot output</span>
				<span id="PrefinerUpgrade2" style="display: none;"><b>Steel Furnaces</b> - Further increase refiner ingot output</span>
				<span id="PrefinerUpgrade3" style="display: none;"><b>Industrial Smelters</b> - Maximize refiner ingot output</span>
				<span id="PminterUpgrade1" style="display: none;"><b>Basic Automated Mints</b> - Increase minter coin output</span>
				<span id="PminterUpgrade2" style="display: none;"><b>Fully Automated Mints</b> - Further increase minter coin output</span>
				<span id="PminterUpgrade3" style="display: none;"><b>AI Operated Mints</b> - Maximize minter coin output</span>
				<span id="PmarketerUpgrade1" style="display: none;"><b>Smooth Talking</b> - Increase marketer goldar output</span>
				<span id="PmarketerUpgrade2" style="display: none;"><b>Corporate Connections</b> - Further increase marketer goldar output</span>
				<span id="PmarketerUpgrade3" style="display: none;"><b>International Trading</b> - Maximize marketer goldar output</span>
				<span id="PmanualUpgrade1" style="display: none;"><b>Knowledgable CEO</b> - Increases resources gained by clicking</span>
				<span id="PmanualUpgrade2" style="display: none;"><b>Best CEO World</b> - Maximize resources gained by clicking</span>
			</div>
		</div>
	</div>
</div>

<div id="employees">
	<div id="employeesContainer">
		<h3>Employees</h3>
		<div id="employeesNumbers">
			<table>
				<tbody><tr>
					<td>Current Employees: </td>
					<td class="number"><span id="employeesCurrent">0</span></td>
				</tr>
			</tbody></table>
			<br>
		</div>
		<div id="employeeHire">
			<div id="hiregroup"><button id="hire" onmousedown="spawn()" disabled="disabled">Hire Employee</button><span class="cost"><span id="employeeCost">20</span> goldar</span><span class="note">: Hire a new worker</span><br></div>
		</div>
	</div>
	<div id="jobsContainer">
		<h3>Jobs</h3>
		<table id="jobs">
			<tbody><tr id="unassignedgroup">
				<td></td>
				<td>Unassigned: </td>
				<td class="number"><span id="unassigned">0</span></td>
				<td></td>
				<td><span class="note">Unassigned Employees</span></td>
			</tr>
			<tr id="minergroup" style="display: table-row;">
				<td><button onmousedown="fire('miners');">&lt;</button></td>
				<td class="job">Miners: </td>
				<td class="number"><span id="miners">0</span></td>
				<td><button onmousedown="hire('miners');" disabled="disabled">&gt;</button></td>
				<td><span class="note">Automatically gather ore</span></td>
			</tr>
			<tr id="refinergroup">
				<td><button onmousedown="fire('refiners');" disabled="disabled">&lt;</button></td>
				<td class="job">Refiners: </td>
				<td class="number"><span id="refiners">0</span></td>
				<td><button onmousedown="hire('refiners');" disabled="disabled">&gt;</button></td>
				<td><span class="note">Automatically smelt ingots</span></td>
			</tr>
			<tr id="mintergroup">
				<td><button onmousedown="fire('minters');" disabled="disabled">&lt;</button></td>
				<td class="job">Minters: </td>
				<td class="number"><span id="minters">0</span></td>
				<td><button onmousedown="hire('minters');" disabled="disabled">&gt;</button></td>
				<td><span class="note">Automatically mint coins</span></td>
			</tr>
			<tr id="marketergroup">
				<td><button onmousedown="fire('marketers');" disabled="disabled">&lt;</button></td>
				<td class="job">Marketers: </td>
				<td class="number"><span id="marketers">0</span></td>
				<td><button onmousedown="hire('marketers');" disabled="disabled">&gt;</button></td>
				<td><span class="note">Sell coins for goldar</span></td>
			</tr>
		</tbody></table>
	</div>
	<div id="eventsContainer">
		<h3>Events</h3>
        <table id="logTable">
            <tbody><tr id="log0"><td id="logT"></td><td id="logL"></td><td id="logR"></td></tr>
	        <tr id="log1"><td colspan="3"></td></tr>
	        <tr id="log2"><td colspan="3"></td></tr>
	        <tr id="log3"><td colspan="3"></td></tr>
	        <tr id="log4"><td colspan="3"></td></tr>
        </tbody></table>
	</div>
	<div id="settings">
		<h3>Settings</h3>
		<button onmousedown="save('manual')" title="Save your current stats">Manual Save</button><br>
		<button onmousedown="deleteSave()" title="Delete your saved stats">Delete Save File</button><br>
		<br>
		<button onmousedown="prestige()" title="Reset your game for a small increase in production">Prestige<br> (<span id="prestigeCost">5000</span> Goldar)</button><br>
		<br>
		<button onmousedown="renameBusiness()" title="Rename your your business">Rename Business</button><br>
		<button onmousedown="renamePlayer()" title="Rename yourself">Rename Yourself</button><br>
	</div>
	<div id="stats">
		<h3>Stats</h3>
		Resource clicks: <span id="clicks">0</span><br><br>
		Total Upgrades: <span id="totalUpgrades">0</span><br><br>
		Total Prestiges: <span id="totalPrestiges">0</span><br><br>
	</div>
	<div style="clear:both;"><br></div>
	<div id="achievements">
		<h3>Achievements</h3>
		<span class="achievement" title="10 Clicks"><span class="achUnlocked" id="achTenClicks">10 Clicks</span></span>
		<span class="achievement" title="100 Clicks"><span class="achUnlocked" id="achHundredClicks">100 Clicks</span></span>
		<span class="achievement" title="1000 Clicks"><span class="achUnlocked" id="achThousandClicks">1000 Clicks</span></span>
		<span class="achievement" title="10000 Clicks"><span class="achUnlocked" id="achTenThousandClicks">10000 Clicks</span></span>
		<div style="clear:both;"><br></div>
		<span class="achievement" title="10 Quarries"><span class="achUnlocked" id="achTenQuarries">10 Quarries</span></span>
		<span class="achievement" title="100 Quarries"><span class="achUnlocked" id="achHundredQuarries">100 Quarries</span></span>
		<span class="achievement" title="10 Refineries"><span class="achUnlocked" id="achTenRefineries">10 Refineries</span></span>
		<span class="achievement" title="100 Refineries"><span class="achUnlocked" id="achHundredRefineries">100 Refineries</span></span>
		<span class="achievement" title="10 Mints"><span class="achUnlocked" id="achTenMints">10 Mints</span></span>
		<span class="achievement" title="100 Mints"><span class="achUnlocked" id="achHundredMints">100 Mints</span></span>
		<span class="achievement" title="10 Skyscrapers"><span class="achUnlocked" id="achTenSkyscrapers">10 Skyscrapers</span></span>
		<span class="achievement" title="100 Skyscrapers"><span class="achUnlocked" id="achHundredSkyscrapers">100 Skyscrapers</span></span>
		<div style="clear:both;"><br></div>
		<span class="achievement" title="10 Employees"><span class="achUnlocked" id="achTenEmployees">10 Employees</span></span>
		<span class="achievement" title="100 Employees"><span class="achUnlocked" id="achHundredEmployees">100 Employees</span></span>
		<span class="achievement" title="1000 Employees"><span class="achUnlocked" id="achThousandEmployees">1000 Employees</span></span>
		<div style="clear:both;"><br></div>
		<span class="achievement" title="7 Upgrades"><span class="achUnlocked" id="achSevenUpgrades">7 Upgrades Purchased</span></span>
		<span class="achievement" title="14 Upgrades"><span class="achUnlocked" id="achFourteenUpgrades">14 Upgrades Purchased</span></span>
	</div>
</div>

<script src="scripts/GoldGenerator.js"></script>



</body></html>