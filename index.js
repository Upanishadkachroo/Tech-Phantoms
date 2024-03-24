document.addEventListener('DOMContentLoaded', function () {
  const usernameInput = document.getElementById('usernameInput');
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const confirmPasswordInput = document.getElementById('confirmPasswordInput');
  const signupButton = document.getElementById('signupButton');
  const loginButton = document.getElementById('loginButton');
  const loginUsername = document.getElementById('loginUsername');
  const loginPassword = document.getElementById('loginPass');
 





  if (signupButton) {
    signupButton.addEventListener('click', async function (event) {
      console.log("pressed")
      // event.preventDefault(); // Prevent form submission
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      // Basic validation
      if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // Create a new user object
      const user = {
        username,
        email,
        password
      };

      try {
        // Send a POST request to the server
        const response = await fetch('http://localhost:8000/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });

        if (!response.ok) {
          throw new Error('Signup request failed');
        }

        // Optionally, reset the form after signup
        usernameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';

        // Alert the user about successful signup
        alert('Signup successful!');
        window.location.href = 'http://localhost:5500/Tech-Phantoms/premium.html';
      } catch (error) {
        console.error('Error:', error);
        alert('Signup failed. Please try again later.');
      }
    });
  }

  if (loginButton) {
    loginButton.addEventListener('click', async function (event) {
      event.preventDefault(); // Prevent form submission

      const username = loginUsername.value.trim();
      const password = loginPassword.value.trim();

      // Basic validation
      if (!username || !password) {
        alert('Please fill in all fields');
        return;
      }

      // Create a new user object
      const user = {
        username,
        password
      };

      try {
        // Send a POST request to the server
        const response = await fetch('http://localhost:8000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });

        if (!response.ok) {
          throw new Error('Login request failed');
        }

        // Optionally, reset the form after login
        loginUsername.value = '';
        loginPassword.value = '';

        // Alert the user about successful login
        alert('Login successful!');

        window.location.href = 'http://localhost:5500/Tech-Phantoms/home.html';
      } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please try again later.');

        window.location.href = 'http://localhost:5500/Tech-Phantoms/login.html';
      }
    }
    );
  }
});
