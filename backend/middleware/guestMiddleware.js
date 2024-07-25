const { v4: uuidv4 } = require('uuid');

const assignGuestId = (req, res, next) => {
  console.log('AssignGuestId middleware called');
  // Check if the user is not authenticated and guestId is not already set in the request
  if (!req.user && !req.guestId) {
    // Check if the guestId cookie exists, otherwise create a new guestId
    const guestId = req.cookies.guestId || `guest_${Date.now()}`;
    console.log('req cookies guestId', req.cookies.guestId)
    
    // Set the guestId cookie with a max age of 7 days
    res.cookie('guestId', guestId, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "Lax" });

    // Assign the guestId to the request object
    req.guestId = guestId;
    
    // Log the assignment of a new guestId
    console.log('New guestId assigned from middleware:', guestId);
  } else if (req.cookies.guestId) {
    // If guestId cookie exists, assign it to the request object
    req.guestId = req.cookies.guestId;
    
    // Log the usage of an existing guestId
    console.log('Existing guestId used:', req.guestId);
  } else {
    // Log when neither condition is met (for debugging purposes)
    console.log('No guestId assigned or used.');
  }
  
  // Proceed to the next middleware or route handler
  next();
};

module.exports = { assignGuestId };
