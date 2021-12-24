const fs = require('fs');
const _ = require('../core/functional');

const split = (input) =>
  input
    ?.toString()
    .split(',')
    .map((v) => _.toNumber(v));

const time = (data) => {
  let total = Math.max(...data);
  const result = {};

  for (let i = 1; i <= total; i++) {
    result[i.toString()] = outcome(data, i);
  }

  return result;
};

const outcome = (items, pos = 2) => {
  return items.reduce((acc, curr) => {
    const m = curr < pos ? -1 : 1;

    return acc + (curr - pos) * m;
  }, 0);
};

const cheapest = (data) => Math.min(...Object.values(data));

const calculatePart = _.pipe(split, time, cheapest);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //323647
});
