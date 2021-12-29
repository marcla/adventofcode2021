const fs = require('fs');
const _ = require('../core/functional');

const split = (rows) => rows.map((row) => row.split('').map(_.toNumber));

const isLowPoints = (current, yPos, xPos, rows) => {
  if (rows[yPos - 1] !== undefined && rows[yPos - 1][xPos] <= current) {
    return false;
  }

  if (rows[yPos + 1] !== undefined && rows[yPos + 1][xPos] <= current) {
    return false;
  }

  if (rows[yPos][xPos - 1] !== undefined && rows[yPos][xPos - 1] <= current) {
    return false;
  }

  if (rows[yPos][xPos + 1] !== undefined && rows[yPos][xPos + 1] <= current) {
    return false;
  }

  return true;
};

const loop = (rows) => {
  const lowPoints = [];

  for (let yIdx = 0; yIdx < rows.length; yIdx++) {
    for (let xIdx = 0; xIdx < rows[yIdx].length; xIdx++) {
      if (isLowPoints(rows[yIdx][xIdx], yIdx, xIdx, rows)) {
        lowPoints.push(rows[yIdx][xIdx] + 1);
      }
    }
  }

  return lowPoints;
};

const counting = (digits = []) => digits.reduce(_.sum);

const calculatePart = _.pipe(_.splittingNewLine, split, loop, counting);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //554
});
