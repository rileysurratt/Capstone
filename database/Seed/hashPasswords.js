const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPasswords() {
    try {
        const users = await prisma.user.findMany();
        for (const user of users) {
          if (!user.password.startsWith('$2')) { // Check if password is already hashed
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await prisma.user.update({
              where: { id: user.id },
              data: { password: hashedPassword }
            });
            console.log(`Hashed password for user with ID ${user.id}`);
          }
        }

        console.log("Password hashing complete!");
        await prisma.$disconnect();
    } catch (error) {
        console.error("Error hashing passwords:", error);
        await prisma.$disconnect();
    }
}

hashPasswords();
