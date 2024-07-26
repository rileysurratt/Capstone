const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/register
router.post("/register", async (req, res) => {
  const { email, password, name, address } = req.body;

  // Validate input
  if (!email || !password || !name || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        address,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: "Invalid bcrypt email or password" });
    }

    // Merge guest cart with user cart
    const guestId = req.cookies.guestId;
    console.log('Login, guestId:', guestId)
    if (guestId) {
      const guestCartItems = await prisma.cart.findMany({
        where: { guestId },
      });

      console.log('Login guestCartItems:', guestCartItems)

      for (let item of guestCartItems) {
        // Check if item already exists in user cart
        const existingItem = await prisma.cart.findFirst({
          where: {
            userId: user.id,
            productId: item.productId,
          },
        });

        if (existingItem) {
          // Update quantity if item already exists
          await prisma.cart.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + item.quantity },
          });
        } else {
          // Add item to user cart if it doesn't exist
          await prisma.cart.create({
            data: {
              userId: user.id,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }
      }

      // Delete guest cart items
      await prisma.cart.deleteMany({
        where: { guestId },
      });

      // Clear guestId cookie
      res.clearCookie("guestId");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
