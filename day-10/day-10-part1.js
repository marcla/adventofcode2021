const fs = require('fs');
const _ = require('../core/functional');

const openBracket = ['(', '[', '{', '<'];
const closeBracket = [')', ']', '}', '>'];
const scorePoints = [3, 57, 1197, 25137];

const scoreMap = Object.fromEntries(_.buildArray(4).map((_, idx) => [closeBracket[idx], scorePoints[idx]]));
// console.log(scoreMap);

// lastIndexOf
// slice(start, end)

const searchIllegalCharacter = (characters) => {
  const closed = [];

  for (const chart of characters.split('')) {
    if (openBracket.includes(chart)) {
      const openBracketIndex = openBracket.indexOf(chart);
      closed.push(closeBracket[openBracketIndex]);

      continue;
    }

    if (chart !== closed[closed.length - 1]) {
      console.log(`${characters} --> Expected ${closed[closed.length - 1]}, but found ${chart} instead`);
      return chart;
    }

    closed.splice(-1, 1);
  }

  return null;
};

const loop = (rows) => {
  const illegals = [];

  for (const row of rows) {
    const illegal = searchIllegalCharacter(row);

    if (illegal) {
      illegals.push(illegal);
    }
  }

  return illegals;
};

const counting = (illegals) => illegals.map((chart) => scoreMap[chart]).reduce(_.sum);

const calculatePart = _.pipe(_.splittingNewLine, loop, counting);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //462693
});
