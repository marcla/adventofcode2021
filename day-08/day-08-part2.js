const fs = require('fs');
const _ = require('../core/functional');

const isNumber = (val) => !isNaN(Number(val));
const sortString = (word) => word.split('').sort().join('');
const compareStringLenght = (a, b) => a.length - b.length;
const concatString = (a, b) => [...new Set([...a.split(''), ...b.split('')].sort())].join('');

const split = (rows) => {
  const result = [];

  for (let index = 0; index < rows.length; index++) {
    const [config, digits] = rows[index].split(' | ');

    const newConfig = config.split(' ').map(sortString).sort(compareStringLenght);
    const newDigits = digits.split(' ').map(sortString);

    result.push([newConfig, newDigits]);
  }

  return result;
};

const decode = (rows) => {
  const result = [];

  for (const [configs, digits] of rows) {
    const digitMap = [];
    digitMap[1] = configs[0];
    digitMap[7] = configs[1];
    digitMap[4] = configs[2];
    digitMap[8] = configs[9];

    // find 9
    const nine = configs
      .filter((word) => !digitMap.includes(word))
      .filter((word) => word.length === 6)
      .find((word) => digitMap[4].split('').every((chart) => word.split('').includes(chart)));
    digitMap[9] = nine;

    // find 3
    const three = configs
      .filter((word) => !digitMap.includes(word))
      .filter((word) => word.length === 5)
      .find((word) => digitMap[1].split('').every((chart) => word.split('').includes(chart)));
    digitMap[3] = three;

    // find 5
    const five = configs
      .filter((word) => !digitMap.includes(word))
      .filter((word) => word.length === 5)
      .find((word) => concatString(digitMap[1], word) === digitMap[9]);
    digitMap[5] = five;

    // find 2
    const two = configs.filter((word) => !digitMap.includes(word)).find((word) => word.length === 5);
    digitMap[2] = two;

    // find 6
    const six = configs
      .filter((word) => !digitMap.includes(word))
      .filter((word) => word.length === 6)
      .find((word) => concatString(digitMap[1], word) === digitMap[8]);
    digitMap[6] = six;

    // find 0
    const zero = configs.filter((word) => !digitMap.includes(word)).find((word) => word.length === 6);
    digitMap[0] = zero;

    result.push(
      Number(
        digits
          .map((digit) => digitMap.findIndex((config) => config === digit))
          .reduce((acc, curr) => `${acc}${curr}`, '')
      )
    );
  }

  return result;
};

const counting = (digits = []) => digits.reduce(_.sum);

const calculatePart = _.pipe(_.splittingNewLine, split, decode, counting);

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart = calculatePart(data);

  console.log(`Puzzle answer is: ${resultPart}`); //1051087
});
