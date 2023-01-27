// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  console.log("Starting pass gen");
  var passwordParams = {
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

  alert(`Strong passwords use numerous character types.

Read the following prompts and choose 'OK' to add a character type or 'Cancel' to skip it.

You MUST add at least one character type.`);

  passwordParams.hasLowercase =
    confirm(`Click OK to add lowercase letters to your password.

Example: a b c d e f g`);
  passwordParams.hasUppercase =
    confirm(`Click OK to add uppercase letters to your password.

Example: A B C D E F G`);
  passwordParams.hasNumeric = confirm(`Click OK to add numbers to your password.

Example: 0 1 2 3 4 5 6`);
  passwordParams.hasSpecialCharacters =
    confirm(`Click OK to add special characters to your password.

Example: ! @ # $ % ^ &`);

  console.log(passwordParams);
}
