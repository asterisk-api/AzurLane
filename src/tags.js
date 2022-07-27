import fs from "node:fs";
import fetch from "node-fetch";

fetch("https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json")
	.then(res => res.json())
	.then(api => tags(api));

export default function tags(azurapi)
{
	const CONTAINER = [];

	azurapi.forEach((ship) =>
	{
		const TAGS = [];

		const SHIP_ID  = ship.id;
		const NAME     = ship.names.en;
		const CODENAME = ship.names.code;

		const RARITY      = ship.rarity;
		const NATION      = ship.nationality;
		const HULLTYPE    = ship.hullType;
		const LIMIT_BREAK = ship.limitBreaks;
		const DEV_LEVELS  = ship.devLevels;
		const RETROFIT    = ship.retrofit;
		const RETROFIT_HULLTYPE = ship.retrofitHullType;

		// Research
		if (["Priority", "Decisive"].includes(RARITY))
			TAGS.push("Research");

		// Retrofit
		if (RETROFIT)
			TAGS.push("Retrofit");

		// Rarity { Normal, Rare, Elite, Super Rare, Ultra Rare, Priority, Decisive }
		const RARITY_LIST = ["Normal", "Rare", "Elite", "Super Rare", "Ultra Rare", "Priority", "Decisive"];
		if (RARITY_LIST.includes(RARITY))
			TAGS.push(RARITY);
		else console.log("=> rarity not match: " + RARITY);

		// Muse
		if (NAME.includes("μ"))
			TAGS.push("Muse");

		// Bulin
		if (["001", "002", "003"].includes(SHIP_ID))
			TAGS.push("Bulin");

		// Collab
		const NATION_LIST = [
			"Universal",
			"Eagle Union",
			"Royal Navy",
			"Sakura Empire",
			"Iron Blood",
			"Dragon Empery",
			"Sardegna Empire",
			"Northern Parliament",
			"Iris Libre",
			"Vichya Dominion",
			"META"
		];

		if (NATION && !NATION_LIST.includes(NATION))
			TAGS.push("Collab");

		// NATIONALITY
		if (NATION) TAGS.push(NATION);
		else console.log("=> Invalid nationality: " + NATION);

		// PREFIX
		const PREFIX = [
			"UNIV",     // Universal
			"USS",      // Eagle Union
			"HMS",      // Royal Navy
			"IJN",      // Sakura Empire
			"KMS",      // Iron Blood
			"SMS",      // Iron Blood
			"PRAN",     // Dragon Empery
			"ROC",      // Dragon Empery
			"RN",       // Sardegna Empire
			"SN",       // Northern Parliament
			"FFNF",     // Iris Libre
			"MNF",      // Vichya Dominion
			"BILI",     // Bilibili
			"KizunaAI", // KizunaAI
			"HDN",      // Neptunia
		];
		if (PREFIX.includes(CODENAME.split(" ")[0]))
			TAGS.push(CODENAME.split(" ")[0]);
		else if (CODENAME.includes("KizunaAI"))
			TAGS.push("KizunaAI");

		// Hull Type
		if (HULLTYPE)
			TAGS.push(HULLTYPE);
		else console.log("=> Invalid hullType: " + HULLTYPE);

		// Short Hull Type
		const SHORT_HULLTYPE = {
			"Destroyer": "DD",
			"Light Cruiser": "CL",
			"Heavy Cruiser": "CA",
			"Large Cruiser": "CB",
			"Battlecruiser": "BC",
			"Battleship": "BB",
			"Light Carrier": "CVL",
			"Light Aircraft Carrier": "CVL",
			"Aircraft Carrier": "CV",
			"Submarine": "SS",
			"Submarine Carrier": "SSV",
			"Aviation Battleship": "BBV",
			"Repair": "AR",
			"Monitor": "BM",
			"Munition Ship": "AE"
		};

		if (SHORT_HULLTYPE[HULLTYPE])
			TAGS.push(SHORT_HULLTYPE[HULLTYPE]);
		else if (HULLTYPE !== "DDG")
			console.log("=> Invalid hullType: " + HULLTYPE);

		// Vanguard / Main Type
		const SHIP_LINE_TYPE = {
			"Destroyer": "Vanguard",
			"Light Cruiser": "Vanguard",
			"Heavy Cruiser": "Vanguard",
			"Large Cruiser": "Vanguard",
			"Battlecruiser": "Main",
			"Battleship": "Main",
			"Light Carrier": "Main",
			"Light Aircraft Carrier": "Main",
			"Aircraft Carrier": "Main",
			"Aviation Battleship": "Main",
			"Repair": "Main",
			"Monitor": "Main",
			"Munition Ship": "Vanguard",
		};

		if (SHIP_LINE_TYPE[HULLTYPE])
			TAGS.push(SHIP_LINE_TYPE[HULLTYPE]);

		// Retrofit Hull Type
		if (RETROFIT_HULLTYPE && RETROFIT_HULLTYPE !== HULLTYPE)
		{
			TAGS.push(RETROFIT_HULLTYPE);
			if (RETROFIT_HULLTYPE !== "DDG")
				TAGS.push(SHORT_HULLTYPE[RETROFIT_HULLTYPE]);

			if (RETROFIT_HULLTYPE === "DDG")
				TAGS.push("Main");
		};

		// DD BONUS { AUX, TRP, AOA }
		const destroyerBonusType = (buff) =>
		{
			const BUFF = buff.toLowerCase();
			if (BUFF.includes("30%") && BUFF.includes("aux"))
				TAGS.push("DD AUX");

			if (BUFF.includes("spread") && BUFF.includes("torpedo"))
				TAGS.push("DD TRP");

			if (BUFF.includes("trigger") && BUFF.includes("assault"))
				TAGS.push("DD AOA");
		};

		if (LIMIT_BREAK)
			LIMIT_BREAK.forEach((lb) =>
				lb.forEach((buff) => destroyerBonusType(buff)));

		if (DEV_LEVELS)
			DEV_LEVELS.forEach((dev) =>
				dev.buffs.forEach((buff) => destroyerBonusType(buff)));

		// Equipment Type {}


		// tags sort by alphabet
		TAGS.sort((a, b) => a < b ? -1 : 1);

		CONTAINER.push({ id: SHIP_ID, name: NAME, tags: TAGS });
	});

	fs.writeFile(
		// "./dist/tags.json",
		"tags.json",
		JSON.stringify(CONTAINER, null, "\t"),
		"utf8",
		function (err) { if (err) return console.log(err) }
	);
};

// typelist
/*
	S1-{type}
	S2-{type}
	S3-{type}
	S4-{type}
	S5-{type}

	{type} => number/integer => range 1 > 20;

	S1M+{mount_count}
	S2M+{mount_count}
	S3M+{mount_count}
		
	{mount_count} => number/integer => approx value > 1

	Torpedo Preload +{preload_count}
	Airstrike Preload +{preload_count}
	Gun Preload +{preload_count}

	{preload_count} => number/integer => approx value > 1

	guntype => {gun_type}
	{gun_type} => oneof
		DD Gun
		CL Gun
		CA Gun
		BB Gun
		Torpedo
		AA Gun
		Fighter
		Torpedo Bomber
		Dive Bomber
		Auxiliary
		CB Gun
		Seaplane
		Submarine Torpedo
		Depth Charge
		Sonar
		ASW Bomber
		Helicopter
		Cargo
		Missle
*/