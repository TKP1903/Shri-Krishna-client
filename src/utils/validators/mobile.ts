export default (
    mobile: number
) => {
    const errors: { mobile: string[] } = {
        mobile: [],
    };
    if (!mobile) {
        errors.mobile.push("Mobile number is required");
        return errors;
    }
    if (mobile.toString().length !== 10) {
        errors.mobile.push("Mobile number must be 10 digits");
    }
    if (mobile.toString().includes(" ")) {
        errors.mobile.push("Mobile number must not contain spaces");
    }
    // can't contain special characters
    if (/[!@#$%^&*]/.test(mobile.toString())) {
        errors.mobile.push(
            "Mobile number must not contain special characters (i.e. @, #, $, ^, & *)"
        );
    }
    // should contain only numbers
    if (!/^[0-9]+$/.test(mobile.toString())) {
        errors.mobile.push("Mobile number must contain only numbers");
    }
    // should not contain letters
    if (/[a-zA-Z]/.test(mobile.toString())) {
        errors.mobile.push("Mobile number must not contain letters");
    }
    return errors;
}; 