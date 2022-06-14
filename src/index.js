const fs = require('fs');
const blackList = require('./black-list');

const data = fs
  .readFileSync('./input/5000-lemmas-forms.csv', {
    encoding: 'utf-8',
  })
  .split('\r\n')
  .map((line) => line.split(','))
  .map(([lemmaRank, lemma, pos, lemFreq, wordFreq, word]) => [
    word?.toLowerCase(),
    lemma?.toLowerCase(),
    +lemmaRank,
  ])
  .filter(([word]) => word && !blackList.includes(word.toLowerCase()))
  .slice(1, -1);

// saving as CSV
const csvRows = data.map((row) => row.join(','));
csvRows.unshift('Word,Lemma,LemmaRank');
fs.writeFileSync('./dist/forms.csv', csvRows.join('\n'), {
  encoding: 'utf-8',
});

// saving as JS
const jsArray = data
  .map(([word, lemma, lemmaRank]) => `["${word}","${lemma}",${lemmaRank}]`)
  .join(',');
fs.writeFileSync('./dist/forms.js', `module.exports=[${jsArray}];`, {
  encoding: 'utf-8',
});

// saving as SQL
fs.writeFileSync(
  './dist/forms.sql',
  `

-- CreateTable
DROP TABLE IF EXISTS "Word";
CREATE TABLE "Word" (
  "word" TEXT NOT NULL,
  "lemma" TEXT NOT NULL,
  "rank" INTEGER NOT NULL,
  CONSTRAINT "Word_pkey" PRIMARY KEY ("word")
);

INSERT INTO
  "Word" (word, lemma, rank)
VALUES ${data
    .map(
      ([word, lemma, rank]) => `
  ('${word.replace(`'`, `''`)}','${lemma}',${rank})`
    )
    .join(',')};
`,
  { encoding: 'utf-8' }
);

// saving as JSON
fs.writeFileSync('./dist/forms.json', JSON.stringify(data), {
  encoding: 'utf-8',
});
