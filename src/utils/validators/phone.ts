export default (
    phone: number
) => {
    const errors: { phone: string[] } = {
        phone: [],
    };
    if (!phone) {
        errors.phone.push("phone number is required");
        return errors;
    }
    if (phone.toString().length !== 10) {
        errors.phone.push("phone number must be 10 digits");
    }
    if (phone.toString().includes(" ")) {
        errors.phone.push("phone number must not contain spaces");
    }
    // can't contain special characters
    if (/[!@#$%^&*]/.test(phone.toString())) {
        errors.phone.push(
            "phone number must not contain special characters (i.e. @, #, $, ^, & *)"
        );
    }
    // should contain only numbers
    if (!/^[0-9]+$/.test(phone.toString())) {
        errors.phone.push("phone number must contain only numbers");
    }
    // should not contain letters
    if (/[a-zA-Z]/.test(phone.toString())) {
        errors.phone.push("phone number must not contain letters");
    }
    return errors;
}; 