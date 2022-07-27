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

		const RARITY   = ship.rarity;
		const NATION   = ship.nationality;
		const HULLTYPE = ship.hullType;
		const RETROFIT = ship.retrofit;
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

		// NATIONALITY
		if (NATION) TAGS.push(NATION);
		else console.log("=> invalid nationality: " + NATION);

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
		else console.log("invalid hullType: " + HULLTYPE);

		// Retrofit Hull Type
		if (RETROFIT_HULLTYPE && RETROFIT_HULLTYPE !== HULLTYPE)
			TAGS.push(RETROFIT_HULLTYPE);


		CONTAINER.push({
			id: SHIP_ID,
			name: NAME,
			tags: TAGS
		});
	});

	fs.writeFile(
		// "./dist/tags.json",
		"tags.json",
		JSON.stringify(CONTAINER, null, "\t"),
		"utf8",
		function (err) { if (err) return console.log(err) }
	);
};

// container design
const prototype = {
	id: String,
	name: String,
	tags: [String, Number, Boolean]
};

// fetch type tags.json => res.json() => api
