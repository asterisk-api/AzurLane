export default function retrofit(azurapi, retrofit, retrofit_effect, id=false) {
    const gid = azurapi._gid;

    let retrofit_hp   = 0;
    let retrofit_fp   = 0;
    let retrofit_trp  = 0;
    let retrofit_aa   = 0;
    let retrofit_avi  = 0;
    let retrofit_rld  = 0;
    let retrofit_hit  = 0;
    let retrofit_eva  = 0;
    let retrofit_spd  = 0;
    let retrofit_luck = 0;
    let retrofit_asw  = 0;

    let return_value = false;
    if ( azurapi.retrofit )
    {
        let retrofit_tree = [];
        retrofit[gid].transform_list.forEach((idx) => {
            idx.forEach((kai) => retrofit_tree.push(kai[1]));
        });

        retrofit_tree.forEach((idx) => {
            retrofit_effect[idx].effect.forEach((efx) => {
               if ( efx.antiaircraft )            { retrofit_aa  += efx.antiaircraft };
               if ( efx.air )                     { retrofit_avi += efx.air };
               if ( efx.antisub )                 { retrofit_asw += efx.antisub };
               if ( efx.cannon )                  { retrofit_fp  += efx.cannon };
               if ( efx.dodge )                   { retrofit_eva += efx.dodge };
               if ( efx.durability )              { retrofit_hp  += efx.durability };
               if ( efx.hit )                     { retrofit_hit += efx.hit };
               if ( efx.reload )                  { retrofit_rld += efx.reload };
               if ( efx.speed )                   { retrofit_spd += efx.speed };
               if ( efx.torpedo )                 { retrofit_trp += efx.torpedo };
            });

            if ( id )
            {
                if ( retrofit_effect[idx].ship_id.length !== 0 )
                {
                    return_value = retrofit_effect[idx].ship_id[0][1];
                }
            };
        });
    };

    if ( !id )
    {
        return_value = ({
            health: retrofit_hp,
            firepower: retrofit_fp,
            torpedo: retrofit_trp,
            antiair: retrofit_aa,
            aviation: retrofit_avi,
            reload: retrofit_rld,
            hit: retrofit_hit,
            evasion: retrofit_eva,
            speed: retrofit_spd,
            luck: retrofit_luck,
            asw: retrofit_asw
        });
    };

    return return_value;
};