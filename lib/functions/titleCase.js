"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTitleCase = void 0;

const toTitleCase = phrase => {
  const arrPhrase = phrase.toLowerCase().split(' ');
  const arrTitleCase = arrPhrase.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  const phraseInTitleCase = arrTitleCase.join(' ');
  return phraseInTitleCase;
};

exports.toTitleCase = toTitleCase;