// --- Day 2: Dive! ---

const fs = require('fs');
const _ = require('../core/functional');

const splitting = (text) => text?.toString().trim().split(/\n/);
const splitActionAndScore = (items) => items.map((item) => item.trim().split(' '));
const simpleGroup = (items) =>
  items.reduce((acc, [command, value]) => ({ ...acc, [command]: Number(acc[command] ?? 0) + Number(value) }), {});
const group = (items) =>
  items.reduce((acc, [command, value]) => {
    const depth = Number(acc.depth ?? 0);
    const position = Number(acc.position ?? 0);
    value = Number(value);

    switch (command) {
      case 'forward':
        return { ...acc, position: position + value };
      case 'up':
        value *= -1;
      case 'down':
        return { ...acc, depth: depth + value };
    }
  }, {});
const aimGroup = (items) =>
  items.reduce((acc, [command, value]) => {
    const aim = Number(acc.aim ?? 0);
    const depth = Number(acc.depth ?? 0);
    const position = Number(acc.position ?? 0);
    value = Number(value);

    switch (command) {
      case 'forward':
        return { ...acc, position: position + value, depth: depth + (aim > 0 ? value * aim : 0) };
      case 'up':
        value *= -1;
      case 'down':
        return { ...acc, aim: aim + value };
    }
  }, {});
const finalDepth = ({ position, depth }) => position * depth;

const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const resultPart1 = _.pipe(splitting, splitActionAndScore, group, finalDepth)(data);
  console.log(`First puzzle answer is: ${resultPart1}`); //2117664

  const resultPart2 = _.pipe(splitting, splitActionAndScore, aimGroup, finalDepth)(data);
  console.log(`Second puzzle answer is: ${resultPart2}`); //2073416724
});
