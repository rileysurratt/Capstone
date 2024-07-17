const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authMiddleware");


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
router.get("/products/:id",  async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        res.status(201).json(product);
    } catch {
        console.error(error);
        res.status(500).json({ error: "Internal server error"})
    }
})

// PATCH update a product (admin)
router.patch("/products/:id", authenticateAndAuthorize("ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity } = req.body;
        const product = await prisma.product.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name, description, price, quantity
            }
        })
        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// POST add new product (admin)
router.post("/products", authenticateAndAuthorize("ADMIN"), async (req, res) => {
    try {
        const { name, description, price, quantity, categoryId } = req.body;
        const product = await prisma.product.create({
            data: {
                name, description, price, quantity, categoryId
            }
        })
        res.status(201).json({"message": "product added"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// DELETE delete a product (admin)
router.delete("/products/:id", authenticateAndAuthorize("ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.delete({
            where: {
                id: parseInt(id)
            }
        })
        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }
        res.status(201).json({"message": "product deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;