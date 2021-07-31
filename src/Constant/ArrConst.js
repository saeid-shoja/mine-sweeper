function createArray(bombs, cells) {
  let arr = [];
  while (arr.length < bombs) {
    var r = Math.floor(Math.random() * cells) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr);
  return arr;
}

export const EASY_ARRAY = createArray(10, 64);
export const NORMAL_ARRAY = createArray(25, 256);
export const HARD_ARRAY = createArray(65, 480);
