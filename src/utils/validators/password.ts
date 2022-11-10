export default (password: string) => {
  // const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // return re.test(string(password));
  const errors: { password: string[] } = {
    password: [],
  };
  if (!password) {
    errors.password.push("Password is required");
    return errors;
  }
  if (password.length < 8) {
    errors.password.push("Password must be at least 8 characters");
  }
  if (!/\d/.test(password)) {
    errors.password.push("Password must contain at least one number");
  }
  // uppercase
  if (!/[A-Z]/.test(password)) {
    errors.password.push("Password must contain at least one uppercase letter");
  }
  // lowercase
  if (!/[a-z]/.test(password)) {
    errors.password.push("Password must contain at least one lowercase letter");
  }

  if (password.length > 50) {
    errors.password.push("Password must be less than 50 characters");
  }
  // special characters
  if (!/[!@#$%^&*]/.test(password)) {
    errors.password.push(
      "Password must contain at least one special character (i.e. @, #, $, ^, & *)"
    );
  }
  return errors;
};
