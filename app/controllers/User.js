const bcrypt = require('bcrypt');
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
    authenticate: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.authenticate(email, password);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).send(err);
        }

    },
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password)
                return res.status(400).json({ error: "All fields are required." });

            // Hash the password before saving it to the database
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user object with the hashed password
            const newUser = await userService.createUser({
                username,
                email,
                password: hashedPassword,
            });
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