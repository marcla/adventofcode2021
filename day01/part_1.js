// --- Day 1: Sonar Sweep ---

const fs = require('fs');
const _ = require('../core/functional');

const splitting = (text) => text?.toString().split(/\n/);
const stringToNumber = (values) => values.map((value) => Number(value));
const chunkBy2 = _.chunk(2);
const chunkBy3 = _.chunk(3);
const countIncreaseNumber = (values) => values.reduce((acc, [first, second]) => acc + Number(second > first), 0);
const countIncreaseGroup = (values) => values.reduce((acc, [[first], [, , second]]) => acc + Number(second > first), 0);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart1 = _.pipe(splitting, stringToNumber, chunkBy2, countIncreaseNumber)(data);
  console.log(`First puzzle answer is: ${resultPart1}`); //1624

  const resultPart2 = _.pipe(splitting, stringToNumber, chunkBy3, chunkBy2, countIncreaseGroup)(data);
  console.log(`Second puzzle answer is: ${resultPart2}`); //1653
});
