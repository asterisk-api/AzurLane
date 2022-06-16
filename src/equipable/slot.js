import fs from 'node:fs';

export default function slot(azurapi, data, range, kai=false) {
    const gid  = azurapi._gid;

    let sid_range = gid.toString() + range;
    if ( kai ) sid_range = range;
    if ( !range ) sid_range = gid.toString() + "4";

    function filter(idx) {
        if ( idx === 1 ) return { id: 1, category: "Destroyer Guns", type: "DD Gun" };
        if ( idx === 2 ) return { id: 2, category: "Light Cruiser Guns", type: "CL Gun" };
        if ( idx === 3 ) return { id: 3, category: "Heavy Cruiser Guns", type: "CA Gun" };
        if ( idx === 4 ) return { id: 4, category: "Battleship Guns", type: "BB Gun" };
        if ( idx === 5 ) return { id: 5, category: "Ship Torpedoes", type: "Torpedo" };
        if ( idx === 6 ) return { id: 6, category: "Anti-Air Guns", type: "AA Gun" };
        if ( idx === 7 ) return { id: 7, category: "Fighter Planes", type: "Fighter" };
        if ( idx === 8 ) return { id: 8, category: "Torpedo Bomber Planes", type: "Torpedo Bomber" };
        if ( idx === 9 ) return { id: 9, category: "Dive Bomber Planes", type: "Dive Bomber" };
        if ( idx === 10 ) return { id: 10, category: "Auxiliary", type: "Auxiliary" };
        if ( idx === 11 ) return { id: 11, category: "Large Cruiser Guns", type: "CB Gun" };
        if ( idx === 12 ) return { id: 12, category: "Seaplanes", type: "Seaplane" };
        if ( idx === 13 ) return { id: 13, category: "Submarine Torpedoes", type: "Submarine Torpedo" };
        if ( idx === 14 ) return { id: 14, category: "Anti-Submarine Equipment", type: "Depth Charge/Sonar/Auxiliary" };
        if ( idx === 15 ) return { id: 15, category: "Anti-Submarine Equipment", type: "ASW Bomber" };
        if ( idx === 17 ) return { id: 17, category: "Anti-Submarine Equipment", type: "ASW Helicopter" };
        if ( idx === 18 ) return { id: 18, category: "Auxiliary", type: "Cargo" };
        if ( idx === 20 ) return { id: 20, category: "Ship Torpedoes", type: "Missile" };
    };

    let equip_1 = [];
    let equip_2 = [];
    let equip_3 = [];
    let equip_4 = [];
    let equip_5 = [];

    data[sid_range].equip_1.forEach((idx) => { equip_1.push(filter(idx)) });
    data[sid_range].equip_2.forEach((idx) => { equip_2.push(filter(idx)) });
    data[sid_range].equip_3.forEach((idx) => { equip_3.push(filter(idx)) });
    data[sid_range].equip_4.forEach((idx) => { equip_4.push(filter(idx)) });
    data[sid_range].equip_5.forEach((idx) => { equip_5.push(filter(idx)) });

    return ({
        equip_1: equip_1,
        equip_2: equip_2,
        equip_3: equip_3,
        equip_4: equip_4,
        equip_5: equip_5
    });


    // subtype 
    // 1 => category: Destroyer Guns => type: DD Gun
    // 2 => category: Light Cruiser Guns => type: CL Gun
    // 3 => category: Heavy Cruiser Guns => type: CA Gun
    // 4 => category: Battleship Guns => type: BB Gun
    // 5 => category: Ship Torpedoes => type: Torpedo
    // 6 => category: Anti-Air Guns => type: AA Gun
    // 7 => category: Fighter Planes => type: Fighter
    // 8 => category: Torpedo Bomber Planes => type: Torpedo Bomber
    // 9 => category: Dive Bomber Planes => type: Dive Bomber
    // 10 => category: Auxiliary => type: Auxiliary
    // 11 => category: Large Cruiser Guns => type: CB Gun
    // 12 => category: Seaplanes => type: Seaplane
    // 13 => category: Submarine Torpedoes => type: Submarine Torpedo
    // 14 => category: Anti-Submarine Equipment => type: Depth Charge, Sonar, Auxiliary
    // 15 => category: Anti-Submarine Equipment => type: ASW Bomber
    // 17 => category: Anti-Submarine Equipment => type: ASW Helicopter
    // 18 => category: Auxiliary => type: CARGO
    // 20 => category: Ship Torpedoes => type: MISSILE
};