const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
    const authHeader    = req.headers['authorization'];
    const token         = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: "Token expired" });
        }

        req.locals = { user: decoded.userID };

        return next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { authenticateToken };