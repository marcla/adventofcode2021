const fs = require('fs');
const _ = require('../core/functional');

const openBracket = ['(', '[', '{', '<'];
const closeBracket = [')', ']', '}', '>'];
const scorePoints = [1, 2, 3, 4];

const scoreMap = Object.fromEntries(_.buildArray(4).map((_, idx) => [closeBracket[idx], scorePoints[idx]]));

const isIllegalString = (characters) => {
  const closed = [];

  for (const chart of characters.split('')) {
    if (openBracket.includes(chart)) {
      const openBracketIndex = openBracket.indexOf(chart);
      closed.push(closeBracket[openBracketIndex]);

      continue;
    }

    if (chart !== closed[closed.length - 1]) {
      return true;
    }

    closed.splice(-1, 1);
  }

  return false;
};

const autocompleteBracket = (characters) => {
  const closed = [];

  for (const chart of characters.split('')) {
    if (openBracket.includes(chart)) {
      const openBracketIndex = openBracket.indexOf(chart);
      closed.push(closeBracket[openBracketIndex]);

      continue;
    }

    if (chart === closed[closed.length - 1]) {
      closed.splice(-1, 1);
    }
  }

  return closed.reverse().join('');
};

const loop = (rows) => {
  const incompletes = [];

  for (const row of rows) {
    if (!isIllegalString(row)) {
      const autocomplete = autocompleteBracket(row);
      incompletes.push(autocomplete);
    }
  }

  return incompletes;
};

const countBracketsScore = (brackets) =>
  brackets
    .split('')
    .map((bracket) => scoreMap[bracket])
    .reduce((acc, curr) => acc * 5 + curr, 0);

const average = (incompletes) => incompletes[Math.round(incompletes.length / 2) - 1];

const elaborate = (incompletes) => incompletes.map(countBracketsScore).sort((a, b) => b - a);

const calculatePart = _.pipe(_.splittingNewLine, loop, elaborate, average);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //
});
