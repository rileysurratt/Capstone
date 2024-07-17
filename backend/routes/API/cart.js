const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authMiddleware");

// Get the current user's cart
router.get('/', authenticateAndAuthorize, async (req, res) => {
    try {
      const userId = req.user.id; // Assuming authentication middleware sets req.user
  
      // Find the user's cart items
      const cartItems = await prisma.cart.findMany({
        where: { userId },
        include: {
          product: true, // Include product details for each cart item
        },
      });
  
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting cart' });
    }
  });
  

module.exports = router;