const fs = require('fs');
const _ = require('../core/functional');

const generateBoard = (size) =>
  Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

const splitCoordinates = (rows) => {
  const result = rows.map((row) => row.split(/,| -> /)).map((row) => row.map(_.toNumber));

  return { coordinates: result, lines: [] };
};

const markBoard = ({ coordinates, lines }) => {
  const size = Math.max(...coordinates.flat()) + 1;
  const board = generateBoard(size);

  for (const [x, y] of lines) {
    board[y][x] = board[y][x] + 1;
  }

  return board;
};

const range = (first, last) =>
  Array(last - first + 1)
    .fill(first)
    .map((val, idx) => val + idx);

const getMinAndMax = (...args) => [Math.min(...args), Math.max(...args)];

const calculateLines = ({ coordinates, lines }) => {
  let newLines = [];

  coordinates.forEach(([x1, y1, x2, y2]) => {
    const [xMin, xMax] = getMinAndMax(x1, x2);
    const [yMin, yMax] = getMinAndMax(y1, y2);

    if (xMin === xMax) {
      for (let newY of range(yMin, yMax)) {
        newLines.push([xMin, newY]);
      }
    } else if (yMin === yMax) {
      for (let newX of range(xMin, xMax)) {
        newLines.push([newX, yMin]);
      }
    }
  });

  return { coordinates, lines: [...lines, ...newLines] };
};

const countBoard = (board) => board.map((row) => row.filter((n) => n >= 2)).reduce((acc, row) => acc + row.length, 0);

const calculatePart1 = _.pipe(_.splittingNewLine, splitCoordinates, calculateLines, markBoard, countBoard);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart1(data);

  console.log(`Puzzle answer is: ${resultPart}`); //5576
});
