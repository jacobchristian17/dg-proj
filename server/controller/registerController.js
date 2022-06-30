const User = require('../model/User')
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) {
        return res.status(400).json({"message":"Username and password required."});
    } else {
        //check for duplicates
        const dup = await User.findOne({user: user}).exec();
        if (dup) {
            return res.sendStatus(409);
        } else {
            try {
                //encrypt
                const hashedPwd = await bcrypt.hash(pwd, 10);
                //create & store new user
                const result = await User.create({
                    "user": user,
                    "pwd": hashedPwd
                });
                res.status(201).json({"success":`New user ${user} created`});
            } catch (err) {
                res.status(500).json({"message":err.message});
            }
        }

    }
}

module.exports = {handleNewUser};