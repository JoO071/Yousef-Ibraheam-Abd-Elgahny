var regexMap = {
  fullName: /^[A-Za-z\s]{3,20}$/,
  email: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
  selectWhere: /^(friends|youtube|podcast|ad|others)$/,
};
function validateInput(input, regex) {
  if (regex.test(input.value.trim())) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
var form = document.querySelector(".cta-form");
form.onsubmit = function (e) {
  var fullNameInput = document.getElementById("full-name");
  var emailInput = document.getElementById("email");
  var selectInput = document.getElementById("select-where");
  var validName = validateInput(fullNameInput, regexMap.fullName);
  var validEmail = validateInput(emailInput, regexMap.email);
  var validSelect = validateInput(selectInput, regexMap.selectWhere);
  if (!validName || !validEmail || !validSelect) {
    e.preventDefault();
    alert("Please fill correctly");
  } else {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
      })
    );
    alert("Registration complet!");
  }
};
