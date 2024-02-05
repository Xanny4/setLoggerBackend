const setService = require('../services/Set');

module.exports = {
    getSets: async (req, res) => {
        try {
            const { userId, exercise, dateStart, dateEnd, typeSort, page, pageSize } = req.query;
            const sets = await setService.getSets(userId, exercise, dateStart, dateEnd, typeSort, page, pageSize);
            res.status(200).json(sets);
        }
        catch (err) {
            res.status(500).send(err);
        }

    },
    //check for getSetsByIds
    getSetById: async (req, res) => {
        try {
            const set = await setService.getSetById(req.params.id);
            res.status(200).json(set);
        }
        catch (err) {
            res.status(500).send(err);
        }

    },
    createSet: async (req, res) => {
        try {
            console.log(req.body);
            console.log(req.userId);
            const { exercise, reps, weight } = req.body;
            const newset = await setService.createSet({ user: req.userId, exercise, reps, weight });
            res.status(201).json(newset);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    modifySet: async (req, res) => {
        try {
            const id = req.params.id;
            const set = req.body;
            await setService.modifySet(set, id);
            res.status(200).json({ message: "Set updated" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    deleteSet: async (req, res) => {
        try {
            const id = req.params.id;
            await setService.deleteSet(id);
            res.status(200).json({ message: "Set deleted" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
}