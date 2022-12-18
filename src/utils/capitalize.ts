const capitalize = (word: string) => {
  const wordArr = word.toLowerCase().split('');
  wordArr[0] = wordArr[0].toUpperCase();
  return wordArr.join('');
};

export default capitalize;
