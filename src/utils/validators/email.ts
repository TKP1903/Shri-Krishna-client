export default (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errors: { email: string[] } = {
    email: [],
  };
  if (!email) {
    errors.email.push("Email is required");
    return errors;
  }
  if (!re.test(String(email).toLowerCase())) {
    errors.email.push("Email is invalid");
    return errors;
  }
  return errors;
};
