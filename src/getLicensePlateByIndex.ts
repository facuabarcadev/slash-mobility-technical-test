/*
 * You work for the DMV; you have a specific, sequential way of generating new license plate numbers:
 * Each license plate number has 6 alphanumeric characters. The numbers always come before the letters.
 * The first plate number is 000000, followed by 000001. Finally, when you arrive at 999999, the next entry
 * would be 00000A, Followed by 00001A. When you arrive at 99999A, the next entry is 00000B. After
 * following the pattern to 99999Z, the next in the sequence would be 0000AA.
 * When 9999AA is reached, the next in the series would be 0000AB...
 * The pattern overview looks a bit like the following:
 * 000000
 * 000001
 * ...
 * 999999
 * 00000A
 * 00001A
 * ...
 * 99999A
 * 00000B
 * 00001B
 * ...
 * 99999Z
 * 0000AA
 * 0001AA
 * ...
 * 9999AA
 * 0000AB
 * 0001AB
 * ...
 * 9999ZZ
 * 000AAA
 * 001AAA
 * ...
 * ZZZZZZ
 * The goal is to write a function that takes some index n as a parameter and returns the nth element in this
 * license plate sequence.
 */

// Numbers: 10 (0-9)
// Letters: 26 (A-Z)
// Only numbers: nnnnnn | 10^6 = 1000000;
// Numbers and 1 letter: nnnnnA | 10^5 * 26;
// Numbers and 2 letters: nnnnAA | 10^4 * 26^2;
// Numbers and 3 letters: nnnAAA | 10^3 * 26^3;
// Numbers and 4 letters: nnAAAA | 10^2 * 26^4;
// Numbers and 5 letters: nAAAAA | 10^1 * 26^5;
// Numbers and 6 letters: AAAAAA | 26^6;


// This consts should be configurable in the future. The same for the ALPHABET.
export const MAX_SLOTS = 6;
export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const MAX_LETTERS = ALPHABET.length

export function numberToLetters(value: number, length: number): string {
  let result = '';
  let tempValue = value;
  for (let i = 0; i < length; i++) {
    const remainder = tempValue % MAX_LETTERS;
    result = ALPHABET[remainder] + result;
    tempValue = Math.floor(tempValue / MAX_LETTERS);
  }
  return result;
}

export function ensureValidIndex(index: number): void {
  if (!Number.isInteger(index) || index < 0) {
    throw new Error("You should pass a valid index");
  }
}

export function countPlatesInStage(totalSlots: number, stage: number): number {
  const digitSlots = totalSlots - stage;
  return 10 ** digitSlots * MAX_LETTERS ** stage;
}

export function findStageAndRemaining(
  index: number,
  totalSlots: number = MAX_SLOTS
): { stage: number; remaining: number; digitSlots: number } {
  let remaining = index;
  let stage = 0;

  while (stage <= totalSlots) {
    const platesInStage = countPlatesInStage(totalSlots, stage);
    if (remaining < platesInStage) break;
    remaining -= platesInStage;
    stage++;
  }

  const digitSlots = totalSlots - stage;
  return { stage, remaining, digitSlots };
}

export function splitNumberAndLetters(
  remaining: number,
  stage: number
): {
  numberPartValue: number;
  letterPartValue: number;
} {
  if (stage === 0) {
    return { numberPartValue: remaining, letterPartValue: 0 };
  }
  const combinationsPerLetters = MAX_LETTERS ** stage;
  const numberPartValue = Math.floor(remaining / combinationsPerLetters);
  const letterPartValue = remaining % combinationsPerLetters;
  return { numberPartValue, letterPartValue };
}

export function formatPlate(
  numberPartValue: number,
  letterPartValue: number,
  digitSlots: number,
  stage: number
): string {
  if (stage === 0) {
    return numberPartValue.toString().padStart(digitSlots + stage, '0')
  }
  const numberPart = numberPartValue.toString().padStart(digitSlots, '0');
  const letterPart = numberToLetters(letterPartValue, stage);
  return numberPart + letterPart;
}

export function getLicensePlateByIndex(index: number): string {
  ensureValidIndex(index);

  const { stage, remaining, digitSlots } = findStageAndRemaining(index, MAX_SLOTS);
  const { numberPartValue, letterPartValue } = splitNumberAndLetters(remaining, stage);

  return formatPlate(numberPartValue, letterPartValue, digitSlots, stage);
}