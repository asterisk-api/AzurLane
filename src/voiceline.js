import fs from 'node:fs';

import skin_list_extract from './voiceline/skin_list_extract.js';
import voiceline_extract from './voiceline/voiceline_extract.js';


export default function voiceline(azurapi, voiceline, voiceline_extra, skin_id, skin_template, name_code)
{
	let ship_skin_list_id = [];

	azurapi.forEach((ship) =>
	{
		const ship_gid    = ship._gid;
		const skin_list   = skin_list_extract(skin_id, skin_template, ship_gid);
		const ship_output = voiceline_extract(ship, skin_list, skin_template, voiceline, voiceline_extra, name_code);

		if ( ship_output.skins.length !== 0 )
			ship_skin_list_id.push(ship_output);
	});

	fs.writeFile(
		"./dist/voiceline.json",
		JSON.stringify(ship_skin_list_id, null, "\t"),
		"utf8",
		function (err)
		{
			if (err)
			{
				console.log("An error occured while writing JSON to File");
				return console.log(err) 
			};
			console.log("=> ./dist/voiceline.json has been updated!");
		}
	);
};
