export default function growth(azurapi, ship, range, kai=false) {
    const gid = azurapi._gid;

    let sid_range = gid.toString() + range;
    let kai_range = false;
    
    if ( azurapi._sid.length === 1 ) sid_range = azurapi._sid[0];
    if ( kai )
    {
        if ( azurapi.retrofit )
        {
            sid_range = range;
            if ( !range ) {
                sid_range = gid.toString() + "4";
                kai_range = true;
            };
        };
    };

    const attrs = (range, idx) => ship[range].attrs_growth[idx];

    let hp   = 0;
    let fp   = 0;
    let trp  = 0;
    let aa   = 0;
    let avi  = 0;
    let rld  = 0;
    let hit  = 0;
    let eva  = 0;
    let spd  = 0;
    let luck = 0;
    let asw  = 0;

    if ( !kai || kai && range || kai_range )
    {
        hp   = attrs(sid_range, 0);
        fp   = attrs(sid_range, 1);
        trp  = attrs(sid_range, 2);
        aa   = attrs(sid_range, 3);
        avi  = attrs(sid_range, 4);
        rld  = attrs(sid_range, 5);
        hit  = attrs(sid_range, 7);
        eva  = attrs(sid_range, 8);
        spd  = attrs(sid_range, 9);
        luck = attrs(sid_range, 10);
        asw  = attrs(sid_range, 11);
    };

    return ({
        health: hp,
        firepower: fp,
        torpedo: trp,
        antiair: aa,
        aviation: avi,
        reload: rld,
        hit: hit,
        evasion: eva,
        speed: spd,
        luck: luck,
        asw: asw
    });
};