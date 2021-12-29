const fs = require('fs');
const _ = require('../core/functional');

const split = (rows) => rows.map((row) => row.split('').map(_.toNumber));

const isLowPoints = (xPos, yPos, board) => {
  const currentValue = board[yPos][xPos];
  const neighbours = findNeighbours(xPos, yPos, board);

  for (const [y, x] of neighbours) {
    if (board[y][x] <= currentValue) {
      return false;
    }
  }

  return true;
};

const findNeighbours = (x, y, board) => {
  const width = board[0].length;
  const height = board.length;
  const neighbours = [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
  ];

  const xRange = (xPos) => xPos >= 0 && xPos < width;
  const yRange = (yPos) => yPos >= 0 && yPos < height;

  return neighbours.filter(([yPos, xPos]) => xRange(xPos) && yRange(yPos));
};

const findEqualOrHigherNeighbours = (xPos, yPos, board, visited = []) => {
  const currentValue = board[yPos][xPos];
  const neighbours = findNeighbours(xPos, yPos, board);

  let basin = [currentValue];
  visited.push(`${xPos},${yPos}`);

  for (const [y, x] of neighbours) {
    if (board[y][x] !== 9 && board[y][x] >= currentValue && !visited.includes(`${x},${y}`)) {
      basin = [...basin, ...findEqualOrHigherNeighbours(x, y, board, visited)];
    }
  }

  return basin;
};

const counting = (basins) => {
  const [a, b, c] = basins.sort((a, b) => b.length - a.length).map((basin) => basin.length);

  return a * b * c;
};

const loop = (board) => {
  const basins = [];

  for (let yPos = 0; yPos < board.length; yPos++) {
    for (let xPos = 0; xPos < board[yPos].length; xPos++) {
      if (isLowPoints(xPos, yPos, board)) {
        const basin = findEqualOrHigherNeighbours(xPos, yPos, board);
        basins.push(basin);
      }
    }
  }

  return basins;
};

const calculatePart = _.pipe(_.splittingNewLine, split, loop, counting);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //1017792
});
