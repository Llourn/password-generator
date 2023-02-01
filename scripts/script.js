// Assignment Code
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  let passwordParams = {
    length: 0,
    hasLowercase: false,
    hasUppercase: false,
    hasNumeric: false,
    hasSpecialCharacters: false,
    hasAtLeastOneCharacterType: function () {
      return (
        this.hasLowercase ||
        this.hasUppercase ||
        this.hasNumeric ||
        this.hasSpecialCharacters
      );
    },
    // Calculates the strength/complexity of the password and
    // returns a strength level as a percentage.
    strength: function () {
      let level = 0;
      for (const prop in this) {
        if (prop == "length") {
          level += Math.floor((40 * (this[prop] - 8)) / 120);
        } else if (typeof this[prop] === "boolean" && this[prop]) {
          level += 15;
        }
      }

      return level;
    },
  };

  // Loops until the user clicks "Cancel" or enters a valid password length.
  while (isNotAValidPasswordLength(passwordParams.length)) {
    passwordParams.length = prompt(`Please choose the length of your password.
  (Must be at least 8 characters and no more than 128 characters)`);

    if (passwordParams.length === null) {
      return "Operation cancelled, click Generate Password to start again.";
    } else if (!isNotAValidPasswordLength(passwordParams.length)) {
      break;
    }
    alert("Invalid entry, please try again.");
  }

  // Loops until the user selects at least one character type.
  while (!passwordParams.hasAtLeastOneCharacterType()) {
    alert(`Strong passwords use numerous character types.

Read the following prompts and choose 'OK' to add a character type or 'Cancel' to skip it.

You MUST add at least one character type.`);

    passwordParams.hasLowercase =
      confirm(`Click OK to add lowercase letters to your password.

Example: a b c d e f g

${strengthMeter(passwordParams.strength())}`);

    passwordParams.hasUppercase =
      confirm(`Click OK to add uppercase letters to your password.

Example: A B C D E F G

${strengthMeter(passwordParams.strength())}`);

    passwordParams.hasNumeric =
      confirm(`Click OK to add numbers to your password.

Example: 0 1 2 3 4 5 6

${strengthMeter(passwordParams.strength())}`);

    passwordParams.hasSpecialCharacters =
      confirm(`Click OK to add special characters to your password.

Example: ! @ # $ % ^ &

${strengthMeter(passwordParams.strength())}`);

    if (!passwordParams.hasAtLeastOneCharacterType()) {
      if (!confirm("Please choose at least one character type.")) {
        return;
      }
    }
  }

  alert(`${strengthMeter(passwordParams.strength())}
  
  ⚙️ Generating password...`);

  return createPassword(passwordParams);
}

// Creates the actual password string.
function createPassword(passwordParams) {
  let chosenCharacterTypes = [];
  let result = "";

  // Add user selected character types to an array.
  for (const prop in passwordParams) {
    if (typeof passwordParams[prop] === "boolean" && passwordParams[prop]) {
      chosenCharacterTypes.push(prop);
    }
  }

  // Loop as many times as the length of the password
  // selecting random characters from the chosen character types
  // and appending those to 'result'
  for (let i = 0; i < passwordParams.length; i++) {
    if (chosenCharacterTypes.length === 1) {
      result += getRandomCharacter(chosenCharacterTypes[0]);
    } else {
      let paramName =
        chosenCharacterTypes[
          Math.floor(Math.random() * chosenCharacterTypes.length)
        ];
      result += getRandomCharacter(paramName);
    }
  }

  return result;
}

// retreives random character based on the character type.
function getRandomCharacter(paramName) {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let numbers = "0123456789";
  let specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  if (paramName === "hasLowercase") {
    return letters[Math.floor(Math.random() * letters.length)];
  }
  if (paramName === "hasUppercase") {
    return letters.toUpperCase()[Math.floor(Math.random() * letters.length)];
  }
  if (paramName === "hasNumeric") {
    return numbers[Math.floor(Math.random() * numbers.length)];
  }
  if (paramName === "hasSpecialCharacters") {
    return specialCharacters[
      Math.floor(Math.random() * specialCharacters.length)
    ];
  }
}

// Generates strength meter based on level ranging from 0-100
function strengthMeter(strengthLevel) {
  let visualization = "";
  for (let i = 0; i < 10; i++) {
    i < Math.floor(strengthLevel / 10)
      ? (visualization += "🟩")
      : (visualization += "🟥");
  }

  let emoji = function () {
    if (strengthLevel <= 25) {
      return "💩";
    } else if (strengthLevel <= 50) {
      return "🥶";
    } else if (strengthLevel <= 75) {
      return "⭐️";
    } else if (strengthLevel <= 99) {
      return "❤️‍🔥";
    } else {
      return "🦄";
    }
  };

  return `Password strength: [${visualization}] ${emoji()}`;
}

// checks to makes sure the password length is a valid value.
function isNotAValidPasswordLength(passwordLength) {
  return isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128;
}
