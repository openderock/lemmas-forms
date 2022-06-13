const fs = require('fs');
const blackList = require('./black-list');

const data = fs
  .readFileSync('./data/5000-lemmas-forms.csv', {
    encoding: 'utf-8',
  })
  .split('\r\n')
  .map((line) => line.split(','))
  .filter(
    ([rank, lemma, pos, lemFreq, wordFreq, word]) =>
      word && !blackList.includes(word)
  )
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
