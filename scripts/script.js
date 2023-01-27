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
  console.log("Starting pass gen");
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
    strength: function () {
      let level = 0;
      for (const prop in this) {
        if (prop == "length") {
          level += 40 * ((this[prop] - 8) / 120);
        } else if (typeof this[prop] === "boolean" && this[prop]) {
          level += 15;
        }
        console.log(this[prop], level);
      }
      console.log("Str level is: ", level);

      let visualization = "";
      for (let i = 0; i < 10; i++) {
        i < level / 10 ? (visualization += "🟩") : (visualization += "🟥");
      }
      console.log(visualization);
    },
  };

  passwordParams.length = prompt(`Please choose the length of your password.
(Must be at least 8 characters and no more than 128 characters)`).trim();

  console.log(passwordParams.length);
  if (passwordParams.length === null) return;

  if (
    isNaN(passwordParams.length) ||
    passwordParams.length < 8 ||
    passwordParams.length > 128
  ) {
    alert("Invalid entry, please try again.");
    generatePassword();
  }

  while (!passwordParams.hasAtLeastOneCharacterType()) {
    alert(`Strong passwords use numerous character types.

Read the following prompts and choose 'OK' to add a character type or 'Cancel' to skip it.

You MUST add at least one character type.`);

    passwordParams.hasLowercase =
      confirm(`Click OK to add lowercase letters to your password.

Example: a b c d e f g`);
    passwordParams.hasUppercase =
      confirm(`Click OK to add uppercase letters to your password.

Example: A B C D E F G`);
    passwordParams.hasNumeric =
      confirm(`Click OK to add numbers to your password.

Example: 0 1 2 3 4 5 6`);
    passwordParams.hasSpecialCharacters =
      confirm(`Click OK to add special characters to your password.

Example: ! @ # $ % ^ &`);

    if (!passwordParams.hasAtLeastOneCharacterType()) {
      if (!confirm("Please choose at least one character type.")) {
        return;
      }
    }
  }

  console.log(passwordParams);
  return createPassword(passwordParams);
}

function createPassword(passwordParams) {
  let chosenCharacterTypes = [];
  let result = "";

  for (const prop in passwordParams) {
    if (typeof passwordParams[prop] === "boolean" && passwordParams[prop]) {
      chosenCharacterTypes.push(prop);
    }
  }

  for (let i = 0; i < passwordParams.length; i++) {
    if (chosenCharacterTypes.length === 1) {
      result += getNextCharacter(chosenCharacterTypes[0]);
    } else {
      let paramName =
        chosenCharacterTypes[
          Math.floor(Math.random() * chosenCharacterTypes.length)
        ];
      result += getNextCharacter(paramName);
    }
  }

  console.log(result);
  return result;
}

function getNextCharacter(paramName) {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let numbers = "0123456789";
  let specialCharacters = "!@#$%^&*()";

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
