# AzurLane
[![Data Update](https://github.com/asterisk-api/AzurLane/actions/workflows/update.yml/badge.svg?branch=main)](https://github.com/asterisk-api/AzurLane/actions/workflows/update.yml)

# Formula
```javascript
// Stats Formula
// Normal
Math.floor((stats + ((growth * (level - 1)) / 1000) + enhance) * affinity_bonus);

// Retrofit
retrofit + Math.floor((retrofit_stats + ((retrofit_growth * (level - 1)) / 1000) + retrofit_enhance) * affinity_bonus);

// Enhance Formula
// => Get max enhance on ship current level
Math.floor((( 3 + 7 * Math.min(level, 100) / 100 ) * enhance_status * 0.1) + 1e-09)
```

# Structure
### statistic.json
```javascript
{
  id: string,
  gid: number,
  name: string,
  stats: [object, object?, object?, object?],
  growth: [object, object?, object?, object?],
  enhance: object,
  retrofit?: object,
  retrofit_stats?: object,
  retrofit_growth?: object,
  retrofit_enhance?: object
}

object: {
  health: number,
  firepower: number,
  torpedo: number,
  antiair: number,
  aviation: number,
  reload: number,
  hit: number,
  evasion: number,
  speed: number,
  luck: number,
  asw: number
}
```
### equipable.json
```javascript
{
  id: string,
  name: string,
  break_1: object,
  break_2?: object,
  break_3?: object,
  break_4?: object,
  retrofit?: object
}

object: {
  equip_1: array,
  equip_2: array,
  equip_3: array,
  equip_4: array,
  equip_5: array
}

array: {
  id: number,
  category: string,
  type: string
}
```
### voiceline.json
```javascript
{
  id: string,
  gid: number,
  name: string,
  skins: array,
}

skins: [
  {
    id: string,
    name: string,
    voiceline: array
  }, // etc...
]

voiceline: [
  {
    type: string,
    line: string,
    oath?: string // Default skin only
  }
]
```
