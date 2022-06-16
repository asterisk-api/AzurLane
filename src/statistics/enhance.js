export default function enhance(azurapi, enhance, enhance_meta, meta_repair, meta_effect, enhance_pr, pr_effect) {
    const gid     = azurapi._gid;
    const faction = azurapi.nationality;

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

    if ( faction === "META" )
    {
        const enhance_air     = enhance_meta[gid].repair_air;
        const enhance_cannon  = enhance_meta[gid].repair_cannon;
        const enhance_effect  = enhance_meta[gid].repair_effect;
        const enhance_reload  = enhance_meta[gid].repair_reload;
        const enhance_torpedo = enhance_meta[gid].repair_torpedo;

        enhance_air.forEach((idx) => enhance_avi += meta_repair[idx].effect_attr[1]);
        enhance_cannon.forEach((idx) => enhance_fp += meta_repair[idx].effect_attr[1]);
        enhance_reload.forEach((idx) => enhance_rld += meta_repair[idx].effect_attr[1]);
        enhance_torpedo.forEach((idx) => enhance_trp += meta_repair[idx].effect_attr[1]);

        enhance_effect.forEach((idx) => {
            enhance_hp  += meta_effect[idx[1]].effect_attr[0][1];
            enhance_aa  += meta_effect[idx[1]].effect_attr[1][1];
            enhance_hit += meta_effect[idx[1]].effect_attr[2][1];
            enhance_eva += meta_effect[idx[1]].effect_attr[3][1];
        });
    }
    else
    {
        const enhance_stats = enhance[gid].durability;
        enhance_fp  += enhance_stats[0];
        enhance_trp += enhance_stats[1];
        enhance_avi += enhance_stats[3];
        enhance_rld += enhance_stats[4];
    };

    if ( enhance_pr[gid] )
    {
        const enhance_effect = enhance_pr[gid].strengthen_effect;
        const enhance_fate   = enhance_pr[gid].fate_strengthen;

        enhance_effect.forEach((idx) => {
            if ( pr_effect[idx].effect_attr === "" ) return;

            pr_effect[idx].effect_attr.forEach((plx) => {
                if ( plx[0] === "durability" ) enhance_hp += plx[1];
                if ( plx[0] === "antiaircraft" ) enhance_aa += plx[1];
                if ( plx[0] === "dodge" ) enhance_eva += plx[1];
            });
        });
        
        enhance_fate.forEach((idx) => {
            if ( pr_effect[idx].effect_attr === "" ) return;

            enhance_luck += pr_effect[idx].effect_attr[0][1];
        });
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