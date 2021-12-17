// --- Day 3: Binary Diagnostic ---

const fs = require('fs');
const _ = require('../core/functional');

const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

const subSplitRow = (items) => items.map((value) => [...value].map((value) => Number(value)));
const flatColumns = (rows) =>
  rows.reduce((acc, columnItems) => {
    columnItems.forEach((column, index) => {
      acc[index] = [...(acc[index] ?? []), column];
    });

    return acc;
  }, []);
const hasMoreNumberOne = (items) => items.reduce((a, c) => a + c, 0) >= Math.round(items.length / 2);
const sumGammaEpsilonColumns = (items) =>
  items.reduce((acc, current) => {
    const result = hasMoreNumberOne(current);

    return [...acc, { gamma: Number(result), epsilon: Number(!result) }];
  }, []);
const generateBinaryResults = (items) =>
  items.reduce(
    (acc, { gamma, epsilon }) => ({
      ...acc,
      gamma: `${acc.gamma ?? ''}${gamma}`,
      epsilon: `${acc.epsilon ?? ''}${epsilon}`,
    }),
    {}
  );
const convertObjectToDecimal = (obj) => Object.values(obj).map((value) => parseInt(Number(value), 2));
const powerConsumption = ([first, second]) => first * second;

const recursiveSum = (rows, columnIndex = 0, findValue = true) => {
  let result, nextRows, binary;

  if (rows.length <= 1) {
    result = rows[0][columnIndex];
    nextRows = rows;
  } else {
    result = Number(
      rows.reduce((acc, curr) => acc + curr[columnIndex], 0) >= Math.round(rows.length / 2) === findValue
    );
    nextRows = rows.filter((row) => row[columnIndex] === result);
  }

  binary = `${result}`;

  if (columnIndex === rows[0].length - 1) {
    return binary;
  }

  return `${binary}${recursiveSum(nextRows, columnIndex + 1, findValue)}`;
};
const reduceAndSumColumns = (rows) => ({
  oxygen: recursiveSum(rows, 0, true),
  co2: recursiveSum(rows, 0, false),
});

const calculatePart1 = _.pipe(
  _.splittingNewLine,
  subSplitRow,
  flatColumns,
  sumGammaEpsilonColumns,
  generateBinaryResults,
  convertObjectToDecimal,
  powerConsumption
);

const calculatePart2 = _.pipe(
  _.splittingNewLine,
  subSplitRow,
  reduceAndSumColumns,
  convertObjectToDecimal,
  powerConsumption
);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart1 = calculatePart1(data);
  console.log(`First puzzle answer is: ${resultPart1}`); //3148794

  const resultPart2 = calculatePart2(data);
  console.log(`Second puzzle answer is: ${resultPart2}`); //2795310
});
