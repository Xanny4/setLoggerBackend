const Set = require("../models/Set");
const WEEK = 1000 * 60 * 60 * 24 * 7;
module.exports = {
    getSets: async (userId, exercise, dateStart, dateEnd, typeSort, page = 1, pageSize = 10) => {
        dateStart = Number(dateStart);
        dateEnd = Number(dateEnd);
        const sortBy = { [typeSort ? typeSort : "createdAt"]: 1 };

        let query = {
            user: userId,
        };
        if (dateStart && dateEnd)
            query.createdAt = { $gte: dateStart, $lt: dateEnd };

        if (exercise) {
            query.exercise = exercise;
        }

        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        return Set.find(query).sort(sortBy).skip(skip).limit(limit);
    },

    //check for getSetsByIds
    getSetById: async (strId) => {
        return await Set.findOne({ _id: strId });
    },
    createSet: async (setData) => {
        const newSet = new Set(setData);
        return newSet.save();
    },
    modifySet: async (setData, id) => {
        try {
            const updatedSet = await Set.findByIdAndUpdate(
                id,
                setData,
                { new: true }
            );

            if (!updatedSet)
                throw new Error("Set not found");

            return updatedSet;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating Set", error);
        }
    },
    deleteSet: async (id) => {
        try {
            const set = await Set.findByIdAndDelete(id);

            if (!set)
                throw new Error("Set not found");
        }
        catch (error) {
            console.log(error);
            throw new Error("Error deleting a set", error);
        }
    }
}