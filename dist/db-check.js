"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = await prisma.user.findMany();
    console.log('Users in DB:', users.length);
    if (users.length > 0) {
        console.log('SuperAdmins:', users.filter((u) => u.Role === 'SUPER_ADMIN').length);
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=db-check.js.map