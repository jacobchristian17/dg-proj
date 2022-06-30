const Users = require('../model/User');

const getAllUsers = async (req, res) => {
    const a = await Users.find();
    if (!a) return res.status(204).json({ "message": "No document on requested data yet." });
    res.json(a);
}
module.exports = {
    getAllUsers
}