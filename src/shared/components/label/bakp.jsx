const string =
  'testando www.gi.com e tambem www.go.com e sem falar de www.a.com';

const urls = [];
let check = false;

let stringTmp = string;
const startIndex = [];
const endIndex = [];

do {
  const start =
    stringTmp.search('http') > 0
      ? stringTmp.search('http')
      : stringTmp.search('www');

  const end =
    string.slice(start).search(' ') > 1
      ? string.slice(start).search(' ')
      : string.length;

  stringTmp = stringTmp.slice(start + end);

  if (start > 0) {
    startIndex.push(start);
    endIndex.push(end + start);
  } else {
    check = true;
  }
} while (!check);

let stringRender = string;
startIndex.forEach((el, i) => {
  stringRender = stringRender.slice(endIndex[i]);
});
