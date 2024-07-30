const { PrismaClient } = require("capstone-database");
const prisma = new PrismaClient();
const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authMiddleware");


// GET /api/users/me (Get current user's info)
router.get('/users/me', authenticateAndAuthorize("ADMIN", "USER"), async (req, res) => {
    // console.log('req.user:', req.user);
    try {
        const userId = req.user.id; // Assuming authentication middleware sets req.user

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (user) {
            res.json({ user, role: req.user.role });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH /api/users/me (Update current user's info)
router.patch('/users/me', authenticateAndAuthorize("USER", "ADMIN"), async (req, res) => {
    const userId = req.user.id; // Get the user ID from the authenticated user
    const { email, name, address, password } = req.body;

    try {
        let updateData = { email, name, address };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/users
router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// GET /api/users/:id
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) },
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH /api/users/:id (Update a user's info)
router.patch('/users/:id', authenticateAndAuthorize("ADMIN", "USER"), async (req, res) => {
    const { id } = req.params;
    const { email, name, address, role } = req.body;

    try {
        // Ensure only admins can change the role
        if (role && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized to change role' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: { email, name, address, role }
        });

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /api/users/:id (Delete a user)
router.delete('/users/:id', authenticateAndAuthorize("ADMIN"), async (req, res) => {
    const { id } = req.params;
    try {
        // Only admins can delete users
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id, 10) },
        });

        if (deletedUser) {
            res.json({ message: 'User successfully deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;