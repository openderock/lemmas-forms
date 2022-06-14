# All Words Forms Of Top 5000 Lemmas

Extracted from [https://www.wordfrequency.info/](https://www.wordfrequency.info/)

## Features

* More than 5000 lemmas
* More than 11450 word froms
* Provided in JS, JSON, CSV & SQL formats

## Install

```
npm i "@derock.ir/lemmas-forms"
```

## Usage

```typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lemmasForms = require('@derock.ir/lemmas-forms/dist/5000-lemmas-forms.json');

export const lexicon = new Map<
  string,
  {
    rank: number;
    lemma: string;
    pos: string;
    lemFreq: number;
    wordFreq: number;
  }
>();

lemmasForms.forEach(([rank, lemma, pos, lemFreq, wordFreq, word]) =>
  lexicon.set(word, { rank, pos, lemFreq, wordFreq, lemma }),
);
```
