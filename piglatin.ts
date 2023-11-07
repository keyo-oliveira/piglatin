const VOWEL_DICTIONARY = ["a", "e", "i", "o", "u", "y"];
const REGEX = "[a-z]";
const SUFFIX = "ay";

function isOnlyLetters(arg: string) {
  let reg = new RegExp(REGEX);
  return reg.test(arg.toLowerCase());
}
function checkIfHaveVowel(arr: string[], dictionary: string[]) {
  let vowel = [] as string[];
  arr.forEach((item) => {
    dictionary.forEach((e) => {
      if (e == item.toLowerCase()) {
        return vowel.push(e);
      }
    });
  });

  return arr.indexOf(vowel[0]);
}

function mountNewWord(word: string) {
  let isCapitalized = false;
  let lettersArrayFromWord = word.split("");

  isCapitalized = word[0] === word[0].toUpperCase();

  let indexOfVowel = checkIfHaveVowel(lettersArrayFromWord, VOWEL_DICTIONARY);

  let pre = word.substring(0, indexOfVowel - 1) ?? "";
  let prefix = word.substring(indexOfVowel - 1, indexOfVowel);
  let stem = word.substring(indexOfVowel, word.length);

  if (isCapitalized) {
    let capitalizedStem = stem.charAt(0).toUpperCase() + stem.slice(1);
    return `${capitalizedStem}${pre.toLowerCase()}${prefix.toLowerCase()}${SUFFIX}`;
  }

  return `${stem}${pre.toLowerCase()}${prefix.toLowerCase()}${SUFFIX}`;
}

function translate(word: string) {
  if (!isOnlyLetters(word)) {
    return word;
  } else {
    let newTranslatedWord = mountNewWord(word);
    return newTranslatedWord;
  }
}

function translatePrase(multipleWords: string) {
  let wordsArray = multipleWords.trim().split(" ");
  return wordsArray.map((word) => {
    return translate(word);
  });
}

function translateWithPunctuations(phrase: string) {
  let punctuationIndexes = [] as number[];
  let punctuations = [] as string[];

  let phraseWithOutPunctuations = phrase.replace(/[.,!?;:]/g, "");
  let translatedFrase = translatePrase(phraseWithOutPunctuations);
  let phraseSplit = phrase.split(" ");

  phraseSplit.forEach((word, wordIndex) => {
    let splitWord = word.split("");
    splitWord.forEach((char) => {
      if (char.match(/[.,!?;:]/g)) {
        punctuations.push(char);
        punctuationIndexes.push(wordIndex);
      }
    });
  });

  return translatedFrase.map((word, indexOfTheWord) => {
    punctuationIndexes.forEach(
      (punctuationFromWordIndex, indexOfCurrentPunctuation) => {
        if (indexOfTheWord == punctuationFromWordIndex) {
          let arr = word.split("");
          arr.push(punctuations[indexOfCurrentPunctuation]);
          let wordPunctuated = arr.join("");
          word = wordPunctuated;
        }
      }
    );
    return word;
  });
}

console.log(translateWithPunctuations("Hey buddy, get away from my car! ").join(" "));