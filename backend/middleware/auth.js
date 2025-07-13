const jwt = require('jsonwebtoken');

// Middleware di autenticazione e autorizzazione
// auth() per autenticazione semplice, auth('admin') per richiedere ruolo admin
module.exports = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token mancante o non valido' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (role && req.user.role !== role) {
        return res.status(403).json({ error: 'Non autorizzato' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token non valido' });
    }
  };
};
