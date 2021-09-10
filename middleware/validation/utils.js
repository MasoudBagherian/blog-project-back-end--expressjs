// 3rd-party modules
const truncatise = require('truncatise');

const isCapital = (char) => {
  return char >= 'A' && char <= 'Z';
};
const isSmall = (char) => {
  return char >= 'a' && char <= 'z';
};
const isAlpha = (char) => {
  return isCapital(char) || isSmall(char);
};
const hasCapital = (word) => {
  return word
    .trim()
    .split('')
    .some((char) => isCapital(char));
};
const hasSmall = (word) => {
  return word
    .trim()
    .split('')
    .some((char) => isSmall(char));
};
const isNumeric = (char) => {
  return !isNaN(char);
};
const hasNumeric = (word) => {
  return word
    .trim()
    .split('')
    .some((char) => isNumeric(char));
};

const isAlphaNumeric = (word) => {
  return word
    .trim()
    .split('')
    .every((char) => isNumeric(char) || isCapital(char) || isSmall(char));
};
module.exports.isName = (value) => {
  return value
    .trim()
    .split('')
    .every((char) => isAlpha(char) || char === ' ');
};
module.exports.isEmail = (value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.trim().toLowerCase());
};
module.exports.isPassword = (word) => {
  return (
    hasCapital(word) &&
    hasSmall(word) &&
    hasNumeric(word) &&
    isAlphaNumeric(word)
  );
};
module.exports.minWords = (value, number) => {
  const options = {
    TruncateBy: 'words',
    TruncateLength: 1000,
    StripHTML: false,
  };
  let text = truncatise(value, options);
  text = text.replace(/>/g, '> ');
  text = text.replace(/&nbsp;/g, ' ');
  text = truncatise(text, { ...options, StripHTML: true });
  text = text.split(' ').filter((el) => el !== '');
  return text.length >= number;
};
