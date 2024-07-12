const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
import { authenticateAndAuthorize } from "../../middleware/authMiddleware";


// GET all categories
router.get("/category", authenticateAndAuthorize("ADMIN", "USER"), async (req, res) => {
    try {
        const category = await prisma.category.findMany();
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
    });

// GET category by id
router.get("/category/:id", authenticateAndAuthorize("ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (!category) {
            res.status(404).json({ error: "category not found" });
        }
        res.status(201).json(category);
    } catch {
        console.error(error);
        res.status(500).json({ error: "Internal server error"})
    }
})

// PATCH update a category (admin)
router.patch("/category/:id", authenticateAndAuthorize("ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await prisma.category.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name
            }
        })
        if (!category) {
            res.status(404).json({ error: "category not created" });
        }
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// POST add new category (admin)
router.post("/category", authenticateAndAuthorize("ADMIN"), async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: {
                name
            }
        })
        res.status(201).json({"message": "category added"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// DELETE delete a category (admin)
router.delete("/category/:id", authenticateAndAuthorize("ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: {
                id: parseInt(id)
            }
        })
        if (!category) {
            res.status(404).json({ error: "category not found" });
        }
        res.status(201).json({"message": "category deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;