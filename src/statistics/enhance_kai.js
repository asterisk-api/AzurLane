export default function enhance_kai(azurapi, enhance, enhance_meta, retrofit_id) {
    let gid = azurapi._gid;

    if ( retrofit_id ) gid = retrofit_id.toString().slice(0, -1);
    if ( !enhance[gid] ) gid = azurapi._gid;

    if ( azurapi.names.en === "Independence" ) gid = azurapi._gid;
    let enhance_hp   = 0;
    let enhance_fp   = 0;
    let enhance_trp  = 0;
    let enhance_aa   = 0;
    let enhance_avi  = 0;
    let enhance_rld  = 0;
    let enhance_hit  = 0;
    let enhance_eva  = 0;
    let enhance_spd  = 0;
    let enhance_luck = 0;
    let enhance_asw  = 0;

    if ( azurapi.nationality !== "META" )
    {
        const enhance_stats = enhance[gid].durability;
        enhance_fp  += enhance_stats[0];
        enhance_trp += enhance_stats[1];
        enhance_avi += enhance_stats[3];
        enhance_rld += enhance_stats[4];
    };

    return ({
        health: enhance_hp,
        firepower: enhance_fp,
        torpedo: enhance_trp,
        antiair: enhance_aa,
        aviation: enhance_avi,
        reload: enhance_rld,
        hit: enhance_hit,
        evasion: enhance_eva,
        speed: enhance_spd,
        luck: enhance_luck,
        asw: enhance_asw
    });
};