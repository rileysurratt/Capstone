const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authMiddleware");
const { assignGuestId } = require("../../middleware/guestMiddleware");

router.use(authenticateAndAuthorize());

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

// Helper function to delete item from cart
const deleteCartItem = async (identifier, productId, isGuest = false) => {
  const whereClause = isGuest ? { guestId: identifier, productId: productId } : { userId: identifier, productId: productId };

  const deletedItem = await prisma.cart.deleteMany({
    where: whereClause
  });

  return deletedItem;
};

// GET /api/cart (Get all items in the cart)
router.get('/cart', async (req, res) => {
  try {
    const identifier = req.user ? req.user.id : req.query.guestId;
    const isGuest = !req.user;

    console.log('Identifier', identifier);
    console.log('Is Guest', isGuest);

    if (!identifier) {
      return res.status(400).json({ error: 'Missing identifier' });
    }

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

    const identifier = req.user ? req.user.id : req.body.guestId;
    const isGuest = !req.user;

    console.log('POST /cart identifier:', identifier);
    console.log('POST /cart isGuest:', isGuest);

    const cartItem = await addCartItem(identifier, productId, quantity, isGuest);

    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/cart (Update item quantity in the cart)
router.patch('/cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ error: 'ProductId and quantity are required' });
    }

    const identifier = req.user ? req.user.id : req.guestId;
    const isGuest = !req.user;

    const whereClause = isGuest ? { guestId: identifier, productId: productId } : { userId: identifier, productId: productId };

    const cartItem = await prisma.cart.findFirst({
      where: whereClause
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    const updatedCartItem = await prisma.cart.update({
      where: { id: cartItem.id },
      data: { quantity: quantity }
    });

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/cart/:productId (Delete item from the cart)
router.delete('/cart/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ error: 'ProductId is required' });
    }

    const identifier = req.user ? req.user.id : req.guestId;
    const isGuest = !req.user;

    const deletedItem = await deleteCartItem(identifier, parseInt(productId), isGuest);

    if (deletedItem.count === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/cart (Clear the cart)
router.delete('/cart', async (req, res) => {
  try {
    const identifier = req.user ? req.user.id : req.guestId;
    const isGuest = !req.user;

    const whereClause = isGuest ? { guestId: identifier } : { userId: identifier };

    await prisma.cart.deleteMany({
      where: whereClause
    });

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/cart/total (Get the total cost of the cart)
router.get('/cart/total', async (req, res) => {
  try {
    const identifier = req.user ? req.user.id : req.guestId;
    const isGuest = !req.user;

    const cartItems = await getCartItems(identifier, isGuest);

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;