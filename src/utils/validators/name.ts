export default (name: string) => {
  const errors: { name: string[] } = {
    name: [],
  };
  if (!name) {
    errors.name.push("Name is required");
    return errors;
  }
  if (name.length < 3) {
    errors.name.push("Name must be at least 3 characters");
  }
  if (name.length > 50) {
    errors.name.push("Name must be less than 50 characters");
  }
  if (name.includes(" ")) {
    errors.name.push("Name must not contain spaces");
  }
  // can't contain special characters
  if (/[!@#$%^&*]/.test(name)) {
    errors.name.push(
      "Name must not contain special characters (i.e. @, #, $, ^, & *)"
    );
  }
  // should not contain numbers
  if (/\d/.test(name)) {
    errors.name.push("Name must not contain numbers");
  }

  // should only contain letters
  if (!/^[a-zA-Z]+$/.test(name)) {
    errors.name.push("Name must only contain letters");
  }
  return errors;
};
