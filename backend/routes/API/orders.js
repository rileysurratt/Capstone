const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authMiddleware");

router.get('/orders', authenticateAndAuthorize("USER"), async (req, res) => {
    const { id: userId } = req.user;
  
    try {
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          orderItems: {
            include: {
              product: true
            }
          }
        }
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;