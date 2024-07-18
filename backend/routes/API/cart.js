const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authMiddleware");
const { assignGuestId } = require("../../middleware/guestMiddleware");

router.use(authenticateAndAuthorize(), assignGuestId);

// Helper function to get cart items
const getCartItems = async (identifier, isGuest = false) => {
  const whereClause = isGuest ? { guestId: identifier } : { userId: identifier };
  console.log('whereClause',whereClause);
  return await prisma.cart.findMany({
    where: whereClause,
    include: { product: true }
  });
};

// Helper function to add item to cart
const addCartItem = async (identifier, productId, quantity, isGuest = false) => {
  const whereClause = isGuest ? { guestId: identifier, productId: productId } : { userId: identifier, productId: productId };
  
  // Check if the item is already in the cart
  let cartItem = await prisma.cart.findFirst({
    where: whereClause
  });

  if (cartItem) {
    // If the item is already in the cart, update the quantity
    cartItem = await prisma.cart.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + quantity }
    });
  } else {
    // If the item is not in the cart, create a new cart item
    cartItem = await prisma.cart.create({
      data: {
        productId: productId,
        quantity: quantity,
        guestId: isGuest ? identifier : undefined,
        userId: !isGuest ? identifier : undefined
      }
    });
  }

  return cartItem;
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

// POST /api/cart (Add item to the cart)
router.post('/cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: 'ProductId and quantity are required' });
    }

    const identifier = req.user ? req.user.id : req.guestId;
    const isGuest = !req.user;

    const cartItem = await addCartItem(identifier, productId, quantity, isGuest);

    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
