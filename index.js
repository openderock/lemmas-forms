const fs = require('fs');

const data = fs
  .readFileSync('./data/5000-lemmas-forms.csv', {
    encoding: 'utf-8',
  })
  .split('\r\n')
  .map((line) => line.split(','))
  .map(([rank, lemma, pos, lemFreq, wordFreq, word]) => [
    +rank,
    lemma,
    pos,
    +lemFreq,
    +wordFreq,
    word,
  ])
  .slice(1, -1);

fs.writeFileSync('./dist/5000-lemmas-forms.json', JSON.stringify(data), {
  encoding: 'utf-8',
});
