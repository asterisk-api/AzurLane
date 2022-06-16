import fs from 'node:fs';

const statistics = JSON.parse(fs.readFileSync("./dist/statistics.json"));
const equipable  = JSON.parse(fs.readFileSync("./dist/equipable.json"));
const voiceline  = JSON.parse(fs.readFileSync("./dist/voiceline.json"));

fs.writeFile("./statistics.json", JSON.stringify(statistics), 'utf8', function (err) {
    if (err)
    {
        console.log("An error occured while writing JSON to File");
        return console.log(err);
    };
    console.log("=> ./statistics.json has been updated!");
});

fs.writeFile("./equipable.json", JSON.stringify(equipable), 'utf8', function (err) {
    if (err)
    {
        console.log("An error occured while writing JSON to File");
        return console.log(err);
    };
    console.log("=> ./equipable.json has been updated!");
});


fs.writeFile("./voiceline.json", JSON.stringify(voiceline), 'utf8', function (err) {
    if (err)
    {
        console.log("An error occured while writing JSON to File");
        return console.log(err);
    };
    console.log("=> ./voiceline.json has been updated!");
});