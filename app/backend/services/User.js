const User = require("../models/User");

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
    getUserById: async (strId) => {
        const user = await User.findOne({ _id: strId });
        const { name, imageURL } = user;
        return {
            name,
            imageURL,
        };

    },
    createUser: async (userData) => {
        //also add the date optional option
        const newUser = new User(userData);
        return newUser.save();
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