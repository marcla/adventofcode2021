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

const direction = (input1, input2) => {
  const dir = 1;

  if (input1 > input2) {
    return -1;
  }

  if (input1 === input2) {
    return 0;
  }

  return dir;
};

const markBoard = ({ coordinates, lines }) => {
  const size = Math.max(...coordinates.flat()) + 1;
  const board = generateBoard(size);

  for (const [x, y] of lines) {
    board[y][x] = board[y][x] + 1;
  }

  return board;
};

const calculateLines = ({ coordinates }) => {
  let lines = [];

  for (let [x1, y1, x2, y2] of coordinates) {
    const xd = direction(x1, x2);
    const yd = direction(y1, y2);
    const length = Math.max(...[Math.abs(x1 - x2), Math.abs(y1 - y2)]) + 1;

    for (let idx = 0; idx < length; idx++) {
      lines.push([x1 + idx * xd, y1 + idx * yd]);
    }
  }

  return { coordinates, lines };
};

const countBoard = (board) => board.map((row) => row.filter((n) => n >= 2)).reduce((acc, row) => acc + row.length, 0);

const calculatePart2 = _.pipe(_.splittingNewLine, splitCoordinates, calculateLines, markBoard, countBoard);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart2(data);

  console.log(`Puzzle answer is: ${resultPart}`); //18144
});
