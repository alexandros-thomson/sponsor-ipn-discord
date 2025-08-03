const tileId = 'echo-001';
const dataPath = './data/tiles.json';

// Load existing tiles
const tiles = JSON.parse(await Deno.readTextFile(dataPath));

// Find and update the relic tile
const tile = tiles.find(t => t.id === tileId);
tile.animation = 'pulse';
tile.lastPulsed = new Date().toISOString();

// Write it back
await Deno.writeTextFile(dataPath, JSON.stringify(tiles, null, 2));
console.log(`Tile ${tileId} animated at ${tile.lastPulsed}`);
