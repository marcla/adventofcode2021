const fs = require('fs');
const _ = require('../core/functional');

const fatherLanternfishResetCounter = 6;
const childrenLanternfishResetCounter = 8;
const days = 256;

const split = (input) =>
  input
    ?.toString()
    .split(',')
    .map((v) => _.toNumber(v));

const tick = (data) => {
  const entries = Object.entries(data).map(([k, v]) => [Number(k) - 1, v]);
  const newTally = Object.fromEntries(entries);
  const underZero = newTally['-1'] ?? 0;

  newTally[fatherLanternfishResetCounter.toString()] =
    (newTally[fatherLanternfishResetCounter.toString()] ?? 0) + underZero;
  newTally[childrenLanternfishResetCounter.toString()] = underZero;
  delete newTally['-1'];

  return newTally;
};

const time = (data) => {
  let fish = data;

  for (let i = 0; i < days; i++) {
    fish = tick(fish);
  }

  return fish;
};

const count = (list) => Object.values(list).reduce((acc, curr) => acc + curr, 0);

const tally = (list) => list.reduce((acc, curr) => ({ ...acc, [curr]: (acc[curr] ?? 0) + 1 }), {});

const calculatePart = _.pipe(split, tally, time, count);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //360610
});
