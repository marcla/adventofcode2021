const fs = require('fs');
const _ = require('../core/functional');

const neighboursMap = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
let hasJustFlashes = [];

const increase = (val) => (val + 1 <= 9 ? val + 1 : 0);
const areFlashes = (val) => val === 0;

const splitRow = (rows) => rows.map((row) => row.split('').map(_.toNumber));

const findNeighbours = (x, y, board) => {
  const width = board[0].length;
  const height = board.length;
  const neighbours = [];

  for (const [xPos, yPos] of neighboursMap) {
    neighbours.push([x + xPos, y + yPos]);
  }

  const xRange = (xPos) => xPos >= 0 && xPos < width;
  const yRange = (yPos) => yPos >= 0 && yPos < height;

  return neighbours.filter(([yPos, xPos]) => xRange(xPos) && yRange(yPos));
};

const increaseNeighbours = (xPos, yPos, board) => {
  const neighbours = findNeighbours(xPos, yPos, board);
  let updateBoard = [...board];
  hasJustFlashes.push(`${xPos},${yPos}`);

  for (const [x, y] of neighbours) {
    if (hasJustFlashes.includes(`${x},${y}`)) {
      continue;
    }

    const newValue = increase(updateBoard[y][x]);

    updateBoard[y][x] = newValue;

    if (areFlashes(newValue)) {
      updateBoard = increaseNeighbours(x, y, updateBoard);
    }
  }

  return updateBoard;
};

const step = (board) => {
  let updateBoard = [...board];

  for (let yPos = 0; yPos < updateBoard.length; yPos++) {
    for (let xPos = 0; xPos < updateBoard[yPos].length; xPos++) {
      if (hasJustFlashes.includes(`${xPos},${yPos}`)) {
        continue;
      }

      const newValue = increase(updateBoard[yPos][xPos]);

      updateBoard[yPos][xPos] = newValue;

      if (areFlashes(newValue)) {
        updateBoard = increaseNeighbours(xPos, yPos, updateBoard);
      }
    }
  }

  hasJustFlashes = [];

  return updateBoard;
};

const isSynchronize = (board) => {
  return board.every((row) => row.every((val) => val === 0));
};

const times = (board) => {
  let updatedBoard = [...board];
  let counter = 0;

  while (isSynchronize(updatedBoard) === false) {
    updatedBoard = step(updatedBoard);
    counter += 1;
  }

  // console.log(updatedBoard.map((characters) => characters.join('')).join('\n'));

  return counter;
};

const calculatePart = _.pipe(_.splittingNewLine, splitRow, times);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //364
});
