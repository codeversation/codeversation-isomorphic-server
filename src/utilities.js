export const constJoin = (...words) =>
  words.map(word => word.toUpperCase()).join('_');
