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

		const SHIP_ID = ship.id;
		const NAME 	  = ship.names.en;

		const RARITY   = ship.rarity;
		const RETROFIT = ship.retrofit;

		// Research
		if (["Priority", "Decisive"].includes(RARITY));
			TAGS.push("Research");

		// Retrofit
		if (RETROFIT)
			TAGS.push("Retrofit");

		// Rarity { Normal, Rare, Elite, Super Rare, Ultra Rare, Priority, Decisive }
		const RARITY_LIST = ["Normal", "Rare", "Elite", "Super Rare", "Ultra Rare", "Priority", "Decisive"];
		if (RARITY_LIST.includes(RARITY))
			TAGS.push(RARITY);
		else console.log("=> rarity not match: " + RARITY);

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
