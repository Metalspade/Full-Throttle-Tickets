class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

document.getElementById("signInForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the values from the input fields
  const usernameInput = document.querySelector('input[name="txt"]');
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="pswd"]');
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Validate if the fields are not empty
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    alert('Please enter all required fields.');
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Validate password criteria
  if (!isPasswordValid(password)) {
    alert('Password should have at least 6 characters, an uppercase letter, a number, and a dot (.)');
    return;
  }

  // Create a new user object
  const user = new User(username, email, password);

  // Store the user object in session storage for access on the index.html page
  sessionStorage.setItem('user', JSON.stringify(user));

  // Redirect to events.html
  window.location.href = "events.html";
});

// Email validation function
function isValidEmail(email) {
  // Regular expression pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation function
function isPasswordValid(password) {
  // Regular expression pattern for password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[.]).{6,}$/;
  return passwordRegex.test(password);
}
