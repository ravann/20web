const form = document.getElementById("fid");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Handle success validation
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
}

// Check input length
function checkLength(input, min, max) {
  console.log(`Input length : ${input.value.length}`);
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters long.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} cannot be more than ${max} characters long.`
    );
  } else {
    showSuccess(input);
  }
}

// Get field name
function getFieldName(element) {
  return element.id.charAt(0).toUpperCase() + element.id.slice(1);
}

// Check required
function checkRequired(arr) {
  arr.forEach((item) => {
    if (item.value.trim() === "") {
      showError(item, `${getFieldName(item)} is required`);
    } else {
      showSuccess(item);
    }
  });
}

// Check passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, "Passwords do not match!!!");
  } else {
    showSuccess(input2);
  }
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkPasswordMatch(password, password2);
  checkLength(username, 3, 15);
  checkLength(password, 8, 25);
  isValidEmail(email);
});
