// --- Day 4: Giant Squid ---

const fs = require('fs');
const _ = require('../core/functional');

const splitBoard = (board) =>
  board.split(/\n/).map((row) =>
    row
      .trim()
      .split(/ +/)
      .map((item) => Number(item))
  );

const splitInputData = (input) => {
  const [numbers, ...boards] = input.toString().trim().split(/\n\n/);

  return {
    numbers: numbers.split(',').map((value) => Number(value)),
    boards: boards.map(splitBoard),
  };
};

const concatColumns = (input) => {
  const newBoardsWithColumns = input.boards.map((board) => {
    return [
      ...board,
      ...board.reduce((acc, rows) => {
        rows.forEach((row, index) => (acc[index] = [...(acc[index] ?? []), row]));

        return acc;
      }, []),
    ];
  });

  return { ...input, boards: newBoardsWithColumns };
};

const findWinner = (winners, index) => winners.find((winner) => winner.index == index);

const calculateWinners =
  (forceStopAtFirstWinner = false) =>
  ({ numbers, boards }) => {
    let extractNumbers = numbers.slice(0, 3);
    let winners = [];

    for (const currentNumber of numbers.slice(3)) {
      extractNumbers = [...extractNumbers, currentNumber];

      boards.forEach((board, boardIndex) => {
        board.forEach((rows) => {
          if (!findWinner(winners, boardIndex) && rows.every((n) => extractNumbers.includes(n))) {
            const filteredBoard = board.map((rows) => rows.filter((row) => !extractNumbers.includes(row)));
            const newWinner = {
              index: boardIndex,
              board: filteredBoard,
              numberThatWin: currentNumber,
            };

            winners.push(newWinner);
          }
        });
      });

      if (forceStopAtFirstWinner && winners.length > 0) {
        break;
      }
    }

    return winners;
  };

const firstWinner = ([winner]) => {
  return sumBoard(winner.board) * winner.numberThatWin;
};
const lastWinner = (winners) => {
  const lastWinner = winners.splice(-1, 1).shift();

  if (lastWinner) {
    return sumBoard(lastWinner.board) * lastWinner.numberThatWin;
  } else {
    console.error('no valid winner');
  }
};

const sumBoard = (board) =>
  board
    .splice(0, 5)
    .reduce((acc, curr) => [...acc, ...curr], [])
    .reduce(_.sum, 0);

const calculatePart1 = _.pipe(splitInputData, concatColumns, calculateWinners(true), firstWinner);
const calculatePart2 = _.pipe(splitInputData, concatColumns, calculateWinners(false), lastWinner);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart1 = calculatePart1(data);
  console.log(`First puzzle answer is: ${resultPart1}`); //44736

  const resultPart2 = calculatePart2(data);
  console.log(`Second puzzle answer is: ${resultPart2}`); //1827
});
