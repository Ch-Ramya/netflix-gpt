export const validateForm = (isSignInForm, email, password, name) => {
  const isEmailVaild = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const newErrors = {
    name: !isSignInForm && !name ? "Name is required" : "",
    email: !email
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "Enter a valid email"
      : "",
    password: !password
      ? "Password is required"
      : password.length < 6
      ? "Password must be at least 6 characters"
      : "",
  };

  return newErrors;
};

export const isValidEmail = (email) => {
  const trimmed = email.trim().toLowerCase();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(trimmed);
};


