
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/AuthConfig');

class SessionController {

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.send(401).json({ msg: 'login invalid' })
    }

    const checkPassword = await user.checkPassword(password);

    if (!checkPassword) {
      return res.send(401).json({ msg: 'login invalid' })
    }

    return res.json({ user: user }, authConfig.secret, { expiresIn: authConfig.expiresIn });

  }
}

module.exports = new SessionController();