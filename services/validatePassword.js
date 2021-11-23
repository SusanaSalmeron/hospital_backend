const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password)
}


module.exports = { validatePassword }