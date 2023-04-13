let code = generateCode();
let attempts = [];
// document.getElementById('secret-code').innerHTML = `Secret code: ${code}`;

document.getElementById('submit-btn').addEventListener('click', function() {
  const guess = document.getElementById('guess').value;
  
    if (guess.match(/^\d{4}$/) && !hasDuplicates(guess)) {
      const result = compareCodes(guess, code);
      attempts.push(`${guess} - ${result}`);
      document.getElementById('result').innerHTML = attempts.map(a => `<p>${a}</p>`).join('');
      if (result === '4 digits correct, 4 in place') {
        document.getElementById('instructions').innerHTML = 'Congratulations! You guessed the code.';
        document.getElementById('guess').disabled = true;
        document.getElementById('submit-btn').disabled = true;
      }
      document.getElementById('guess').value = '';
    }
  }
);
document.getElementById('guess').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const guess = document.getElementById('guess').value;
    if (guess.match(/^\d{4}$/) && !hasDuplicates(guess)) {
      const result = compareCodes(guess, code);
      attempts.push(`${guess} - ${result}`);
      document.getElementById('result').innerHTML = attempts.map(a => `<p>${a}</p>`).join('');
      if (result === '4 digits correct, 4 in place') {
        document.getElementById('instructions').innerHTML = 'Congratulations! You guessed the code.';
        document.getElementById('guess').disabled = true;
        document.getElementById('submit-btn').disabled = true;
      }
      document.getElementById('guess').value = '';
    }
  }
});

function generateCode() {
  let code = '';
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * digits.length);
    code += digits[index];
    digits.splice(index, 1);
  }
  return code;
}

function compareCodes(guess, code) {
  let correctCount = 0;
  let correctIndexes = [];
  for (let i = 0; i < 4; i++) {
    if (guess[i] === code[i]) {
      correctCount++;
      correctIndexes.push(i);
    }
  }
  let closeCount = 0;
  for (let i = 0; i < 4; i++) {
    if (!correctIndexes.includes(i) && code.includes(guess[i])) {
      closeCount++;
    }
  }
  const correctDigits = correctCount + closeCount;
  const result = `${correctDigits} правильно, ${correctCount} на своем месте`;
  if (correctCount === 4) {
    return result + ' - Код Угадан!';
  }
  return result;
}

function hasDuplicates(str) {
  const sortedStr = str.split('').sort().join('');
  for (let i = 0; i < sortedStr.length - 1; i++) {
    if (sortedStr[i] === sortedStr[i + 1]) {
      return true;
    }
  }
  return false;
}
