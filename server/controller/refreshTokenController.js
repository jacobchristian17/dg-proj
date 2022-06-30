const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    } else {
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt
        // const user = userDB.users.find(item => item.refreshToken === refreshToken);
        const user = await User.findOne({ refreshToken }).exec();
        if (!user) return res.sendStatus(403); //forbidden
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            (err, decoded) => {
                if (err) return res.sendStatus(403);
                const roles = Object.values(user.roles);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "user": user.user,
                            "roles": roles
                        }
                    },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '900s' }
                );
                res.json({ accessToken });
            }
        );
    }
}
module.exports = { handleRefreshToken };