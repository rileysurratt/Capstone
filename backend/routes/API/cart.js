const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authMiddleware");
const { assignGuestId } = require("../../middleware/guestMiddleware");

router.use(assignGuestId);

// Helper function to get cart items
const getCartItems = async (identifier, isGuest = false) => {
  const whereClause = isGuest ? { guestId: identifier } : { userId: identifier };
  console.log('whereClause',whereClause);
  return await prisma.cart.findMany({
    where: whereClause,
    include: { product: true }
  });
};

// GET /api/cart (Get all items in the cart)
router.get('/cart', async (req, res) => {
  try {
    const identifier = req.user ? req.user.id : req.guestId;
    const isGuest = !req.user;

    console.log('Identifier', identifier);
    console.log('Is Guest', isGuest);

    const cartItems = await getCartItems(identifier, isGuest);

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
