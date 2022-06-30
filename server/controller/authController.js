const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ "message": "Username and password required." });
    } else {
        const user_db = await User.findOne({ user }).exec();
        if (!user_db) {
            return res.status(400).json({ "error": "Cannot find user." })
        } else {
            const match = await bcrypt.compare(pwd, user_db.pwd);
            if (match) {
                const roles = Object.values(user_db.roles).filter(Boolean);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "user": user_db.user,
                            "roles": roles
                        }
                    },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '900s' }
                );
                const refreshToken = jwt.sign(
                    { "user": user_db.user },
                    process.env.REFRESH_TOKEN,
                    { expiresIn: '1d' }
                );
                //save refresh token w/ logged in user
                user_db.refreshToken = refreshToken;
                const result = await user_db.save();

                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({ roles, accessToken });
            } else {
                res.status(401).json({ "error": "Password is invalid" });
            }
        }
    }
}
module.exports = { handleLogin };