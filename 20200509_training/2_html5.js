const f = document.getElementById("form");
const fname = document.getElementById("fname");

function validateForm(e) {
  e.preventDefault();
  console.log(e);
  console.log(fname.value);
  if (fname.value == undefined || fname.value.length == 0) {
    fname.classList = "elem error";
  } else {
    fname.classList = "elem";
  }
}

f.addEventListener("submit", validateForm);
