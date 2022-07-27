import fs from 'node:fs';
import fetch from 'node-fetch';

// import
import statistics from "./statistics.js";
import equipable from "./equipable.js";
import voiceline from "./voiceline.js";

// repository
const repository  = "https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/";
const server_name = "CN";
const repo_path   = repository + server_name;

const ARGS = process.argv.slice(2);

Promise.all([
    fetch("https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json")
    .then(res => res.json()),
    fetch(repo_path + "/sharecfgdata/ship_data_statistics.json") // ship_statistic
    .then(res => res.json()),
    fetch(repo_path + "/sharecfgdata/ship_data_template.json") // ship_template
    .then(res => res.json()),
    fetch(repo_path + "/sharecfgdata/ship_data_breakout.json") // ship_breakout
    .then(res => res.json()),
    fetch(repo_path + "/ShareCfg/ship_data_strengthen.json") // ship_enhance
    .then(res => res.json()),

    fetch(repo_path + "/ShareCfg/skill_data_template.json") // skill
    .then(res => res.json()),

    fetch(repo_path + "/ShareCfg/ship_data_trans.json") // retrofit
    .then(res => res.json()),
    fetch(repo_path + "/ShareCfg/transform_data_template.json") // retrofit_template
    .then(res => res.json()),

    fetch(repo_path + "/ShareCfg/ship_strengthen_meta.json") // meta_enhance
    .then(res => res.json()),
    fetch(repo_path + "/ShareCfg/ship_meta_repair.json") // meta_repair
    .then(res => res.json()),
    fetch(repo_path + "/ShareCfg/ship_meta_repair_effect.json") // meta_effect
    .then(res => res.json()),

    fetch(repo_path + "/ShareCfg/ship_data_blueprint.json") // research_enhance
    .then(res => res.json()),
    fetch(repo_path + "/ShareCfg/ship_strengthen_blueprint.json") // research_effect
    .then(res => res.json()),

    fetch("https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/EN/sharecfgdata/ship_skin_words.json") // skin_words
    .then(res => res.json()),
    fetch("https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/EN/ShareCfg/ship_skin_words_extra.json") // skin_words_extra
    .then(res => res.json()),
    fetch("https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/EN/ShareCfg/ship_skin_words.json") // ship_skin
    .then(res => res.json()),
    fetch("https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/EN/ShareCfg/ship_skin_template.json") // skin_template
    .then(res => res.json()),
    fetch("https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/EN/ShareCfg/name_code.json") // name_code
    .then(res => res.json())
]).then(
    ([
        azurapi,
        ship_statistic, ship_template, ship_breakout, ship_enhance,
        skill,
        retrofit, retrofit_template,
        meta_enhance, meta_repair, meta_effect,
        research_enhance, research_effect,
        skin_words, skin_words_extra,
        ship_skin, skin_template, name_code
    ]) =>
    {
        if ( ARGS.includes('statistics') || ARGS.includes('stat') )
            statistics(
                azurapi, ship_statistic, ship_enhance,
                meta_enhance, meta_repair, meta_effect,
                research_enhance, research_effect,
                retrofit, retrofit_template
            );

        if ( ARGS.includes('equipable') || ARGS.includes('eq') )
            equipable(azurapi, ship_template, retrofit, retrofit_template);

        if ( ARGS.includes('voiceline') || ARGS.includes('vl') )
            voiceline(azurapi, skin_words, skin_words_extra, ship_skin.all, skin_template, name_code);

        fs.writeFile(
            "./dist/azurapi.json",
            JSON.stringify(azurapi, null, '\t'),
            'utf8',
            function (err) {
                if (err)
                {
                    console.log("An error occured while writing JSON to File");
                    return console.log(err);
                };
                console.log("=> ./dist/azurapi.json has been updated!");
            }
        );
    },
    (error) => console.log('error: ' + error)
);