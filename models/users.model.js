const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(path.resolve(__dirname, 'users.json'));
let users = JSON.parse(rawdata);

const getUserByEmail = (email) => {
    const foundUser = users.filter(user => user.email === email)
    return foundUser.length > 0 ? foundUser[0] : null
}

module.exports = { getUserByEmail };