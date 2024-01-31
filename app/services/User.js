const User = require("../models/User");
const bcrypt = require('bcrypt')
module.exports = {
    getAllUsers: async () => {
        const allUsers = await User.find({});
        return allUsers.map(e => ({
            id: e._id,
            name: e.name,
            imageURL: e.imageURL,
        }));
    },
    //check for getUsersByIds
    authenticate: async (email, password) => {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password))
            return user;
    },
    createUser: async (userData) => {
        try {
            const existingUser = await User.findOne({
                $or: [{ email: userData.email }, { username: userData.username }],
            });

            if (existingUser) {
                if (existingUser.email === userData.email) {
                    return { user: null, message: "Email already exists!" };
                } else {
                    return { user: null, message: "Username is taken!" };
                }
            }

            const newUser = new User(userData);
            const savedUser = await newUser.save();
            return { user: savedUser, message: "User created successfully!" };
        } catch (error) {
            console.error("Error creating User:", error);
            throw new Error("Error creating User");
        }
    },

    modifyUser: async (userData, id) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                userData,
                { new: true }
            );

            if (!updatedUser)
                throw new Error("User not found");

            return updatedUser;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating User", error);
        }
    },
    deleteUser: async (id) => {
        try {
            const user = await User.findByIdAndDelete(id);

            if (!user)
                throw new Error("User not found");
        }
        catch (error) {
            console.log(error);
            throw new Error("Error deleting a user", error);
        }
    }
}