const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authMiddleware");


router.post('/checkout', authenticateAndAuthorize("USER"), async (req, res) => {
    const userId  = req.user.id;
    console.log('checkout userId', userId)
    const { cartItems, total } = req.body;
  
    try {
      const order = await prisma.order.create({
        data: {
          userId: userId,
          totalPrice: total,
          orderItems: {
            create: cartItems.map(item => ({
              productId: item.product.id,
              quantity: item.quantity
            }))
          }
        }
      });
  
      await Promise.all(cartItems.map(async item => {
        await prisma.product.update({
          where: { id: item.product.id },
          data: { quantity: { decrement: item.quantity } }
        });
      }));
  
      await prisma.cart.deleteMany({
        where: { userId }
      });
  
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error('Error processing checkout:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;