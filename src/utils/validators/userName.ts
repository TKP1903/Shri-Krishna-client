export default (userName: string) => {
    const errors: { userName: string[] } = {
        userName: [],
    };
    if (!userName) {
        errors.userName.push("User name is required");
        return errors;
    }
    if (userName.length < 3) {
        errors.userName.push("User name must be at least 3 characters");
    }
    if (userName.length > 50) {
        errors.userName.push("User name must be less than 50 characters");
    }
    if (userName.includes(" ")) {
        errors.userName.push("User name must not contain spaces");
    }
    // can't contain special characters
    if (/[!@#$%^&*]/.test(userName)) {
        errors.userName.push(
            "User name must not contain special characters (i.e. @, #, $, ^, & *)"
        );
    }
    // should contain numbers
    if (!/\d/.test(userName)) {
        errors.userName.push("User name must contain at least one number");
    }
    // should contain letters
    if (!/[a-zA-Z]/.test(userName)) {
        errors.userName.push("User name must contain at least one letter");
    }
    return errors;
}