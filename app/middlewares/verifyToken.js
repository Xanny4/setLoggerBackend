const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    console.log("in auth");
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Attach user ID to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
module.exports = verifyToken;