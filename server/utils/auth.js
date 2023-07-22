
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  signToken: function ({ _id, role }) {
    const payload = { _id, role };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
