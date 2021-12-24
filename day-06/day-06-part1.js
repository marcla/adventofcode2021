const fs = require('fs');
const _ = require('../core/functional');

const fatherLanternfishResetCounter = 6;
const childrenLanternfishResetCounter = 8;
const days = 80;

const split = (input) =>
  input
    ?.toString()
    .split(',')
    .map((v) => _.toNumber(v));

const tick = (data) => {
  const newFishs = [];
  const childs = [];

  for (let idx = 0; idx < data.length; idx++) {
    const element = data[idx];

    if (element === 0) {
      newFishs[idx] = fatherLanternfishResetCounter;
      childs.push(childrenLanternfishResetCounter);
    } else {
      newFishs[idx] = element - 1;
    }
  }

  return [...newFishs, ...childs];
};

const time = (data) => {
  let fish = data;

  for (let i = 0; i < days; i++) {
    fish = tick(fish);
  }

  return fish;
};

const count = (list) => list.length;

const calculatePart = _.pipe(split, time, count);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //360610
});
