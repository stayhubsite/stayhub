// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma2 = new PrismaClient();

async function main() {
  // Crear roles
  const roles = ["superadmin", "admin", "user"];

  for (const roleName of roles) {
    await prisma2.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  // Crear superadmin si no existe
  const superadminEmail = "JU4NC4R1D4D@gmail.com";
  const existingSuperadmin = await prisma2.user.findUnique({
    where: { email: superadminEmail },
  });

  if (!existingSuperadmin) {
    const hashedPassword = await bcrypt.hash("jccg210507.", 10);

    const superadminRole = await prisma2.role.findUnique({
      where: { name: "superadmin" },
    });

    if (!superadminRole) {
      throw new Error("Rol superadmin no encontrado");
    }

    await prisma2.user.create({
      data: {
        email: superadminEmail,
        password: hashedPassword,
        roleId: superadminRole.id,
        // No asignar hotelId ya que es superadmin
      },
    });

    console.log("Superadmin creado:", superadminEmail);
  } else {
    console.log("Superadmin ya existe:", existingSuperadmin.email);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma2.$disconnect();
  });
