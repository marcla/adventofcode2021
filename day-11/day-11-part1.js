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
let flashCounter = 0;

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

  return neighbours.filter(([xPos, yPos]) => xRange(xPos) && yRange(yPos));
};

const increaseNeighbours = (xPos, yPos, board) => {
  const neighbours = findNeighbours(xPos, yPos, board);
  let updateBoard = [...board];
  hasJustFlashes.push(`${xPos},${yPos}`);
  flashCounter += 1;

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

const howManyTimes = 100;
const times = (board) => {
  let updatedBoard = [...board];

  for (let index = 0; index < howManyTimes; index++) {
    updatedBoard = step(updatedBoard);
  }

  // console.log(updatedBoard.map((characters) => characters.join('')).join('\n'));

  return flashCounter;
};

const slowFn_times = (board) => {
  let counter = 0;

  for (let index = 0; index < howManyTimes; index++) {
    const flashed = [];
    const queue = [];

    for (let yPos = 0; yPos < board.length; yPos++) {
      for (let xPos = 0; xPos < board[yPos].length; xPos++) {
        board[yPos][xPos] += 1;
        queue.push([xPos, yPos]);
      }
    }

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      if (flashed.includes(`${x},${y}`)) {
        continue;
      }

      const cell = board[y][x];

      if (cell > 9) {
        flashed.push(`${x},${y}`);

        for (const [x1, y1] of findNeighbours(x, y, board)) {
          board[y1][x1] += 1;
          queue.push([x1, y1]);
        }
      }
    }

    flashed.map((position) => position.split(',')).forEach(([x, y]) => (board[y][x] = 0));

    counter += flashed.length;
  }

  // console.log(updatedBoard.map((characters) => characters.join('')).join('\n'));

  return counter;
};

const calculatePart = _.pipe(_.splittingNewLine, splitRow, times);
const slowButMuchClear_calculatePart = _.pipe(_.splittingNewLine, splitRow, slowFn_times);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);
  console.log(`Puzzle answer is: ${resultPart}`); //1743

  // const slowButMuchClear_resultPart = slowButMuchClear_calculatePart(data);
  // console.log(`Puzzle answer is: ${slowButMuchClear_resultPart}`); //1743
});
