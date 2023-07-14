// 25[0-5] match 250-255
// 2[0-4]\d match 200-249
// 1\d{2}  match 100 - 199
// [1-9]\d match 10-99
// \d match 0-9
function validateRGB(rgbValue) {
  const rgbRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/;
  return rgbRegex.test(rgbValue);
}

function validateHex(hexValue) {
  const hexRegex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(hexValue);
}

// Hexadecimal is base 16
// toString(16) always returns lower case
function convertComponentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function convertRgbToHex(r, g, b) {
  return (
    convertComponentToHex(r) +
    convertComponentToHex(g) +
    convertComponentToHex(b)
  );
}

function setBackgroundColor(color) {
  document.querySelector("body").style.backgroundColor = `#${color}`;
}

function displayError(errorMessage) {
  errorContainer.innerHTML = errorMessage;
}

const hexInput = document.getElementById("hex-value");
const rgbAllInputs = document.querySelectorAll("#rgb-inputs-container input");
const errorContainer = document.querySelector("p.error");

hexInput.addEventListener("input", () => {
  const hexValue = hexInput.value;
  setBackgroundColor(hexValue);
  let arrRgb = [];

  if (validateHex(hexValue)) {
    displayError("");
    errorContainer.classList.remove("error-bg");
    if (hexValue.length === 6) {
      for (let i = 0; i < 6; i += 2) {
        // extracts substring of length 2 char starting from i index
        const hexPart = hexValue.substr(i, 2);
        const decimalValue = parseInt(hexPart, 16);
        arrRgb.push(decimalValue);
      }
    } else if (hexValue.length === 3) {
      hexValue.split("").forEach((char) => {
        const hexPart = char + char;
        // parseInt parses a string argument and returns an integer of the specified radix (for hex base 16)
        const decimalValue = parseInt(hexPart, 16);
        arrRgb.push(decimalValue);
      });
    }
  } else {
    errorContainer.classList.add("error-bg");
    displayError(
      "<p>Make sure that HEX value is 3 or 6 characters long</p>" +
        "<p>Can only contain numbers 0-9 and/or A, B, C, D, F letters</p>"
    );
  }

  rgbAllInputs.forEach((item, i) => {
    item.value = arrRgb[i] || 0;
  });
});

rgbAllInputs.forEach((item) => {
  item.addEventListener("input", () => {
    if (validateRGB(item.value)) {
      displayError("");
      errorContainer.classList.remove("error-bg");

      // using Spread to create a shallow copy of the rgbAllInputs NodeList
      // rgbValues gets and parse values from every RGB input fields
      const rgbValues = [...rgbAllInputs].map((input) => parseInt(input.value));
      const hexValue = convertRgbToHex(...rgbValues);
      hexInput.value = hexValue;

      setBackgroundColor(hexValue);
    } else {
      errorContainer.classList.add("error-bg");
      displayError("<p>Can only contain numbers from 0 to 255</p>");
    }
  });
});
