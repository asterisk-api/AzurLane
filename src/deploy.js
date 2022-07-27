import fs from 'node:fs';

const statistics = JSON.parse(fs.readFileSync("./dist/statistics.json"));
const equipable  = JSON.parse(fs.readFileSync("./dist/equipable.json"));
const voiceline  = JSON.parse(fs.readFileSync("./dist/voiceline.json"));

const _statistics = JSON.parse(fs.readFileSync("./statistics.json"));
const _equipable  = JSON.parse(fs.readFileSync("./equipable.json"));
const _voiceline  = JSON.parse(fs.readFileSync("./voiceline.json"));

const version = JSON.parse(fs.readFileSync("./version.json"));
const _version = JSON.parse(fs.readFileSync("./version.json"));

// statistics
if ( JSON.stringify(statistics) !== JSON.stringify(_statistics) )
{
    fs.writeFile("./statistics.json", JSON.stringify(statistics), 'utf8', function (err)
    {
        if (err)
        {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./statistics.json has been updated!");
    });
    version.statistics.version += 1;
    version.statistics.timestamp = Date.now();
} else { console.log("=> ./statistics.json is up to date!") };

// equipable
if ( JSON.stringify(equipable) !== JSON.stringify(_equipable) )
{
    fs.writeFile("./equipable.json", JSON.stringify(equipable), 'utf8', function (err)
    {
        if (err)
        {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./equipable.json has been updated!");
    });
    version.equipable.version += 1;
    version.equipable.timestamp = Date.now();
} else { console.log("=> ./equipable.json is up to date!") };

// voiceline
if ( JSON.stringify(voiceline) !== JSON.stringify(_voiceline) )
{
    fs.writeFile("./voiceline.json", JSON.stringify(voiceline), 'utf8', function (err)
    {
        if (err)
        {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./voiceline.json has been updated!");
    });
    version.voiceline.version += 1;
    version.voiceline.timestamp = Date.now();
} else { console.log("=> ./voiceline.json is up to date!") };

// version
if ( JSON.stringify(version) !== JSON.stringify(_version) )
{
    fs.writeFile("./version.json", JSON.stringify(version), 'utf8', function (err)
    {
        if (err)
        {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./version.json has been updated!");
    });
};