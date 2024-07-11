const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();



// GET all products
router.get("/products", async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
    });

// GET product by id

// PUT update a product (admin)

// POST add new product (admin)

// DELETE delete a product (admin)

module.exports = router;