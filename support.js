document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const questionInput = document.getElementById("question");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const questionError = document.getElementById("questionError");
  const successMessage = document.getElementById("successMessage");

  function clearStatus(input, errorElement) {
    input.classList.remove("invalid", "valid");
    errorElement.textContent = "";
  }

  function setError(input, errorElement, message) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    errorElement.textContent = message;
  }

  function setValid(input, errorElement) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    errorElement.textContent = "";
  }

  function validateEmail() {
    const email = emailInput.value.trim();

    if (email === "") {
      setError(emailInput, emailError, "Please enter your email address.");
      return false;
    }

    if (!email.includes("@")) {
      setError(
        emailInput,
        emailError,
        "Invalid email: your email must contain an @ symbol. Please enter a new email address."
      );
      return false;
    }

    setValid(emailInput, emailError);
    return true;
  }

  function validatePhone() {
    const phone = phoneInput.value.trim();
    const digitsOnly = phone.replace(/\D/g, "");

    if (phone === "") {
      setError(phoneInput, phoneError, "Please enter your phone number.");
      return false;
    }

    if (digitsOnly.length < 10) {
      setError(
        phoneInput,
        phoneError,
        "Invalid phone number: it has fewer than 10 digits."
      );
      return false;
    }

    if (digitsOnly.length > 10) {
      setError(
        phoneInput,
        phoneError,
        "Invalid phone number: it has more than 10 digits."
      );
      return false;
    }

    setValid(phoneInput, phoneError);
    return true;
  }

  emailInput.addEventListener("input", function () {
    clearStatus(emailInput, emailError);
  });

  phoneInput.addEventListener("input", function () {
    clearStatus(phoneInput, phoneError);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    successMessage.style.display = "none";

    let isValid = true;

    if (!validateEmail()) {
      isValid = false;
    }

    if (!validatePhone()) {
      isValid = false;
    }

    if (isValid) {
      successMessage.style.display = "block";
      form.reset();

      nameInput.classList.remove("valid", "invalid");
      emailInput.classList.remove("valid", "invalid");
      phoneInput.classList.remove("valid", "invalid");
      questionInput.classList.remove("valid", "invalid");
    }
  });
});
