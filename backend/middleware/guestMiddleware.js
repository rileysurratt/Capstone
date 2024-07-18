const { v4: uuidv4 } = require('uuid');

const assignGuestId = (req, res, next) => {
  if (!req.user && !req.cookies.guestId) {
    const guestId = uuidv4();
    res.cookie('guestId', guestId, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }); // 1 week expiration
    req.guestId = guestId;
  } else if (!req.user && req.cookies.guestId) {
    req.guestId = req.cookies.guestId;
  }
  next();
};

module.exports = { assignGuestId };
