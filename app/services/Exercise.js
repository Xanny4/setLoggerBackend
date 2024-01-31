const Exercise = require("../models/Exercise");
const Set = require("../models/Set");

module.exports = {
    getExercises: async (page = 1, pageSize = 10) => {
        try {
            const skip = (page - 1) * pageSize;
            const limit = pageSize;

            return Set.aggregate([
                {
                    $group: {
                        _id: "$exercise",
                        count: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: "exercises",
                        localField: "_id",
                        foreignField: "_id",
                        as: "exerciseDetails"
                    }
                },
                {
                    $unwind: "$exerciseDetails"
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);

        } catch (error) {
            console.error("Error fetching exercises sorted by sets:", error);
            throw error;
        }
    },

    deleteExercise: async (id) => {
        try {
            const exercise = await Exercise.findByIdAndDelete(id);

            if (!exercise)
                throw new Error("Exercise not found");
        }
        catch (error) {
            console.log(error);
            throw new Error("Error deleting a exercise", error);
        }
    }
}