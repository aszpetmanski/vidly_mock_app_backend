import jsonwebtoken from "jsonwebtoken";
import config from "config";

export function auth (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Acces denied. No token provided.');

    try {
    const decoded = jsonwebtoken.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
    }

    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

