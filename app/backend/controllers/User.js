const userService = require('../services/User');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        }
        catch (err) {
            res.status(500).send(err);
        }

    },
    getUserById: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).send(err);
        }

    },
    createUser: async (req, res) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(200).json(newUser);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    modifyUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = req.body;
            await userService.modifyUser(user, id);
            res.status(200).json({ message: "User updated" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            await userService.deleteUser(id);
            res.status(200).json({ message: "User deleted" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
}