export const makeVocabulary = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result.toLocaleUpperCase();
};

export const makeVocabularyText = (text: string): string[] => {
  let result = "";
  const arr = text.split("");
  arr.sort(function () {
    return 0.5 - Math.random();
  });
  result = arr.join("");
  return result.toLocaleUpperCase().split("");
};
