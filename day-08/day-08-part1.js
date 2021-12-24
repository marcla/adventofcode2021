const fs = require('fs');
const _ = require('../core/functional');

const validLenght = [2, 3, 4, 7];

const split = (rows) => {
  let result = [];

  for (const segments of rows) {
    const [, output] = segments.split(' | ');
    result.push(output.split(' '));
  }

  return result.flat();
};

const counting = (digits = []) => {
  return digits.filter((digit) => validLenght.includes(digit.length)).length;
};

const calculatePart = _.pipe(_.splittingNewLine, split, counting);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //
});
