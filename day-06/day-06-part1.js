const fs = require('fs');
const _ = require('../core/functional');

const calculatePart = _.pipe(_.splittingNewLine, _.debug);

fs.readFile('./test.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //18144
});
