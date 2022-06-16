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

        break_1  = stats(api, ship_statistic, 1);

        let stats_builder  = [ break_1 ];

        if ( sid.length > 1 )
        {
            break_2 = stats(api, ship_statistic, 2);
            break_3 = stats(api, ship_statistic, 3);
            break_4 = stats(api, ship_statistic, 4);

            stats_builder = [ ...stats_builder, break_2, break_3, break_4 ];
        };

        const growth_builder   = growth(api, ship_statistic, 1);
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