const UsernameValidation = (username) => {
    if (username === "") {
        return "";
    }
    if (username.length < 3) {
        return "Username must be at least 3 characters long";
    }
    if (username.length > 20) {
        return "Username must be at most 20 characters long";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return "Username can only contain letters, numbers, and underscores";
    }
    return "";
}

const EmailValidation = (email) => {
    if (email === "") {
        return "";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Invalid email";
    }
    return "";
}

const PasswordValidation = (password) => {
    if (password === "") {
        return "";
    }
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }
    if (password.length > 50) {
        return "Password must not be 50 characters long";
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)){
        return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    return "";
}
export{
    UsernameValidation,
    EmailValidation,
    PasswordValidation
}