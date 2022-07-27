import fs from 'node:fs';

import retrofit from "./statistics/retrofit.js";
import slot from "./equipable/slot.js";

export default function equipable(azurapi, ship_template, retrofit_data, retrofit_effect)
{
    let json_builder = [];

    azurapi.forEach((api) =>
    {
        const gid  = api._gid;
        const sid  = api._sid;
        const id   = api.id;
        const name = api.names.en;

        const retrofit_id = retrofit(api, retrofit_data, retrofit_effect, true);

        const break_1 = slot(api, ship_template, 1);
        let break_2   = [];
        let break_3   = [];
        let break_4   = [];
        let break_5   = [];
        if ( gid === 10000 || gid === 10001 || gid === 10002 )
        {
            json_builder.push({
                id: id,
                name: name,
                break_1: break_1
            });
        }
        else if ( api.retrofit )
        {
            break_2 = slot(api, ship_template, 2);
            break_3 = slot(api, ship_template, 3);
            break_4 = slot(api, ship_template, 4);
            break_5 = slot(api, ship_template, retrofit_id, true);

            json_builder.push({
                id: id,
                name: name,
                break_1: break_1,
                break_2: break_2,
                break_3: break_3,
                break_4: break_4,
                retrofit: break_5
            });
        }
        else
        {
            break_2 = slot(api, ship_template, 2);
            break_3 = slot(api, ship_template, 3);
            break_4 = slot(api, ship_template, 4);

            json_builder.push({
                id: id,
                name: name,
                break_1: break_1,
                break_2: break_2,
                break_3: break_3,
                break_4: break_4
            });
        };
    });

    fs.writeFile(
        "./dist/equipable.json",
        JSON.stringify(json_builder, null, '\t'),
        'utf8',
        function (err) {
            if (err) {
                console.log("An error occured while writing JSON to File");
                return console.log(err);
            };
            console.log("=> ./dist/equipable.json has been updated!");
        }
    );
};