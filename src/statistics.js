import fs from 'node:fs';

import stats from "./statistics/stats.js";
import growth from "./statistics/growth.js";
import enhance from "./statistics/enhance.js";
import enhance_kai from "./statistics/enhance_kai.js";
import retrofit from "./statistics/retrofit.js";

export default function statistics(
    azurapi, ship_statistic, ship_enhance,
    meta_enhance, meta_repair, meta_effect,
    research_enhance, research_effect,
    retrofit_data, retrofit_template
) {
    let json_builder = [];
    azurapi.forEach((api) => {
        const gid     = api._gid;
        const sid     = api._sid;
        const id      = api.id;
        const name    = api.names.en;

        let break_1, break_2, break_3, break_4;
        let growth_1, growth_2, growth_3, growth_4;

        break_1  = stats(api, ship_statistic, 1);
        growth_1 = growth(api, ship_statistic, 4);
        let stats_builder  = [ break_1 ];
        let growth_builder = [ growth_1 ];

        if ( sid.length > 1 )
        {
            break_2 = stats(api, ship_statistic, 2);
            break_3 = stats(api, ship_statistic, 3);
            break_4 = stats(api, ship_statistic, 4);

            stats_builder = [ ...stats_builder, break_2, break_3, break_4 ];

            growth_2 = growth(api, ship_statistic, 2);
            growth_3 = growth(api, ship_statistic, 3);
            growth_4 = growth(api, ship_statistic, 4);

            growth_builder = [ ...growth_builder, growth_2, growth_3, growth_4 ];
        };

        const enhance_builder  = enhance(api, ship_enhance, meta_enhance, meta_repair, meta_effect, research_enhance, research_effect);
        const retrofit_builder = retrofit(api, retrofit_data, retrofit_template);
        const retrofit_id      = retrofit(api, retrofit_data, retrofit_template, true);
        const retrofit_stats   = stats(api, ship_statistic, retrofit_id, true);
        const retrofit_growth  = growth(api, ship_statistic, retrofit_id, true);
        const retrofit_enhance = enhance_kai(api, ship_enhance, meta_enhance, retrofit_id);

        if ( api.retrofit )
        {
            json_builder.push({
                id: id,
                gid: gid,
                name: name,
                stats: stats_builder,
                growth: growth_builder,
                enhance: enhance_builder,
                retrofit: retrofit_builder,
                retrofit_stats: retrofit_stats,
                retrofit_growth: retrofit_growth,
                retrofit_enhance: retrofit_enhance
            });
        } else
        {
            json_builder.push({
                id: id,
                gid: gid,
                name: name,
                stats: stats_builder,
                growth: growth_builder,
                enhance: enhance_builder
            });
        };

        function statsGet(type, kai=false, level=124, affection=1.06) {
            let stats   = stats_builder.slice(-1)[0][type];
            let growth  = growth_builder.slice(-1)[0][type];
            let enhance = enhance_builder[type];

            let oath    = affection;
            if ( type === "luck" || type === "speed" ) oath = 1; 
            if ( kai )
            {
                stats   = retrofit_stats[type];
                growth  = retrofit_growth[type];
                enhance = retrofit_enhance[type];
            };
            return Math.floor( ( stats + ( ( growth * level ) / 1000 ) + enhance ) * oath );
        };

        function consoleGet(type, kai=false) {
            let subtype = type;
            if ( type === "asw" ) subtype = "antisubmarineWarfare";
            if ( type === "hit" ) subtype = "accuracy";
            let stats_1 = statsGet(type);
            let stats_2 = api.stats.level125[subtype];

            if ( stats_1.toString() !== stats_2.toString() )
                console.log(name + " = " + type + " = " + stats_1 + " !== " + stats_2);

            if ( kai )
            {
                stats_1 = retrofit_builder[type] + statsGet(type, true);
                stats_2 = api.stats.level125Retrofit[subtype];

                if ( stats_1.toString() !== stats_2.toString() )
                    console.log(name + " = kai = " + type + " = " + stats_1 + " !== " + stats_2);
            };
        };

        consoleGet("health");
        consoleGet("firepower");
        consoleGet("torpedo");
        consoleGet("antiair");
        consoleGet("aviation");
        consoleGet("reload");
        consoleGet("hit");
        consoleGet("evasion");
        consoleGet("speed");
        consoleGet("luck");
        consoleGet("asw");

    });

    fs.writeFile("./dist/statistics.json", JSON.stringify(json_builder, null, '\t'), 'utf8', function (err) {
        if (err)
        {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./dist/statistics.json has been updated!");
    });
};