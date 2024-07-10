const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Starting to seed database...");

    //Create User and Admin for test

    const Admin1 = await prisma.user.create({
      data: {
        email: "admin@admin.com",
        password: "adminpw",
        name: "Admin User",
        address: "Test Address, NY NY 11111",
        role: "ADMIN",
      },
    });

    const user1 = await prisma.user.create({
      data: {
        email: "user@userone.com",
        password: "testuser1",
        name: "John Smith",
        address: "Test User Address, NY NY 11111",
        role: "USER",
      },
    });

    // Categories
    const cat1 = await prisma.category.create({
      data: {
        name: "CPU",
      },
    });

    const cat2 = await prisma.category.create({
      data: {
        name: "Motherboard",
      },
    });

    const cat3 = await prisma.category.create({
      data: {
        name: "Memory",
      },
    });

    const cat4 = await prisma.category.create({
      data: {
        name: "Storage",
      },
    });

    const cat5 = await prisma.category.create({
      data: {
        name: "Power Supply",
      },
    });

    const cat6 = await prisma.category.create({
      data: {
        name: "Graphics Card",
      },
    });

    const cat7 = await prisma.category.create({
      data: {
        name: "Operating System",
      },
    });

    const cat8 = await prisma.category.create({
      data: {
        name: "Keyboard",
      },
    });

    const cat9 = await prisma.category.create({
      data: {
        name: "Mouse",
      },
    });

    const cat10 = await prisma.category.create({
      data: {
        name: "Monitor",
      },
    });

    const cat11 = await prisma.category.create({
      data: {
        name: "Sound Card",
      },
    });

    const cat12 = await prisma.category.create({
      data: {
        name: "Headphones",
      },
    });

    const cat13 = await prisma.category.create({
      data: {
        name: "Cooling System",
      },
    });

    const cat14 = await prisma.category.create({
      data: {
        name: "Tools",
      },
    });

    // //PRODUCTS:
    // //1 CPUs
    // const cpu1 = await prisma.product.create({
    //   data: {
    //     name: "Intel Core i7-11700K",
    //     description:
    //       "High-performance 8-core processor for gaming and multitasking.",
    //     price: 399.99,
    //     quantity: 10,
    //     categoryId: 1,
    //   },
    // });

    // const cpu2 = await prisma.product.create({
    //   data: {
    //     name: "AMD Ryzen 9 5900X",
    //     description: "12-core powerhouse for content creation and gaming.",
    //     price: 549.99,
    //     quantity: 10,
    //     categoryId: 1,
    //   },
    // });

    // const cpu3 = await prisma.product.create({
    //   data: {
    //     name: "Intel Core i5-11600K",
    //     description: "6-core CPU ideal for mid-range gaming and productivity.",
    //     price: 269.99,
    //     quantity: 10,
    //     categoryId: 1,
    //   },
    // });

    // //2 Motherboards
    // const mb1 = await prisma.product.create({
    //   data: {
    //     name: "ASUS ROG Strix Z590-E Gaming",
    //     description:
    //       "Feature-rich motherboard with PCIe 4.0 support and WiFi 6.",
    //     price: 349.99,
    //     quantity: 10,
    //     categoryId: 2,
    //   },
    // });
    // const mb2 = await prisma.product.create({
    //   data: {
    //     name: "MSI MPG B550 Gaming Edge WiFi	",
    //     description: "Budget-friendly motherboard with robust gaming features.",
    //     price: 179.99,
    //     quantity: 10,
    //     categoryId: 2,
    //   },
    // });
    // const mb3 = await prisma.product.create({
    //   data: {
    //     name: "Gigabyte X570 AORUS Elite",
    //     description:
    //       "High-end motherboard with extensive connectivity options.",
    //     price: 249.99,
    //     quantity: 10,
    //     categoryId: 2,
    //   },
    // });

    // //3 Memory
    // const mem1 = await prisma.product.create({
    //   data: {
    //     name: "Corsair Vengeance LPX 16GB (2 x 8GB) DDR4 3200MHz",
    //     description: "High-performance RAM for smooth gaming and multitasking.	",
    //     price: 89.99,
    //     quantity: 10,
    //     categoryId: 3,
    //   },
    // });
    // const mem2 = await prisma.product.create({
    //   data: {
    //     name: "G.SKILL Trident Z RGB Series 32GB (2 x 16GB) DDR4 3600MHz	",
    //     description:
    //       "RGB RAM with high speed for enthusiasts and content creators.",
    //     price: 199.99,
    //     quantity: 10,
    //     categoryId: 3,
    //   },
    // });
    // const mem3 = await prisma.product.create({
    //   data: {
    //     name: "Crucial Ballistix 32GB (2 x 16GB) DDR4 3200MHz",
    //     description:
    //       "Reliable RAM with good performance at a reasonable price.",
    //     price: 159.99,
    //     quantity: 10,
    //     categoryId: 3,
    //   },
    // });

    // //4 Storage

    // const st1 = await prisma.product.create({
    //   data: {
    //     name: "Samsung 970 EVO Plus 1TB NVMe SSD",
    //     description:
    //       "Ultra-fast SSD with high capacity for faster boot times and data transfer.",
    //     price: 169.99,
    //     quantity: 10,
    //     categoryId: 4,
    //   },
    // });
    // const st2 = await prisma.product.create({
    //   data: {
    //     name: "WD Blue 4TB SATA 6Gb/s HDD",
    //     description: "Large capacity HDD for mass storage needs.",
    //     price: 99.99,
    //     quantity: 10,
    //     categoryId: 4,
    //   },
    // });
    // const st3 = await prisma.product.create({
    //   data: {
    //     name: "Crucial MX500 500GB SATA SSD",
    //     description:
    //       "Reliable SSD for faster system performance and application loading.",
    //     price: 69.99,
    //     quantity: 10,
    //     categoryId: 4,
    //   },
    // });

    // //5 Power Supplies
    // const ps1 = await prisma.product.create({
    //   data: {
    //     name: "Corsair RM850x 850W 80+ Gold Fully Modular	",
    //     description:
    //       "Efficient and reliable power supply for high-end systems.",
    //     price: 149.99,
    //     quantity: 10,
    //     categoryId: 5,
    //   },
    // });
    // const ps2 = await prisma.product.create({
    //   data: {
    //     name: "EVGA 600W 80+ Bronze Non-Modular",
    //     description:
    //       "Budget-friendly power supply for basic gaming and office PCs.",
    //     price: 59.99,
    //     quantity: 10,
    //     categoryId: 5,
    //   },
    // });
    // const ps3 = await prisma.product.create({
    //   data: {
    //     name: "Seasonic Focus GX-850 850W 80+ Gold Fully Modular",
    //     description:
    //       "Premium power supply with excellent efficiency and quiet operation.",
    //     price: 179.99,
    //     quantity: 10,
    //     categoryId: 5,
    //   },
    // });

    // //6 Graphics Card
    // const gc1 = await prisma.product.create({
    //   data: {
    //     name: "NVIDIA GeForce RTX 3080 Founders Edition",
    //     description: "High-end GPU for 4K gaming and ray tracing.",
    //     price: 699.99,
    //     quantity: 10,
    //     categoryId: 6,
    //   },
    // });
    // const gc2 = await prisma.product.create({
    //   data: {
    //     name: "AMD Radeon RX 6700 XT",
    //     description: "Powerful GPU for high-refresh-rate gaming and VR.",
    //     price: 479.99,
    //     quantity: 10,
    //     categoryId: 6,
    //   },
    // });
    // const gc3 = await prisma.product.create({
    //   data: {
    //     name: "NVIDIA GeForce GTX 1660 Super",
    //     description:
    //       "Entry-level GPU with good performance for budget gaming PCs.",
    //     price: 229.99,
    //     quantity: 10,
    //     categoryId: 6,
    //   },
    // });

    // //7 Operating Systems
    // const os1 = await prisma.product.create({
    //   data: {
    //     name: "Microsoft Windows 10 Home 64-bit",
    //     description: "Full version of Windows 10 for home users.",
    //     price: 139.99,
    //     quantity: 10,
    //     categoryId: 7,
    //   },
    // });
    // const os2 = await prisma.product.create({
    //   data: {
    //     name: "Microsoft Windows 11 Pro 64-bit",
    //     description:
    //       "Latest version of Windows for business and professional users.",
    //     price: 199.99,
    //     quantity: 10,
    //     categoryId: 7,
    //   },
    // });
    // const os3 = await prisma.product.create({
    //   data: {
    //     name: "Ubuntu 20.04 LTS",
    //     description: "Free and open-source Linux operating system.",
    //     price: 0.0,
    //     quantity: 10,
    //     categoryId: 7,
    //   },
    // });

    // //8 Keyboards
    // const kb1 = await prisma.product.create({
    //   data: {
    //     name: "Logitech G Pro X Mechanical Gaming Keyboard",
    //     description:
    //       "High-performance keyboard with customizable RGB lighting.",
    //     price: 149.99,
    //     quantity: 10,
    //     categoryId: 8,
    //   },
    // });
    // const kb2 = await prisma.product.create({
    //   data: {
    //     name: "Razer BlackWidow V3 Pro Wireless Mechanical Gaming Keyboard",
    //     description:
    //       "Wireless mechanical keyboard with Razer Chroma RGB lighting.",
    //     price: 229.99,
    //     quantity: 10,
    //     categoryId: 8,
    //   },
    // });
    // const kb3 = await prisma.product.create({
    //   data: {
    //     name: "Corsair K95 RGB Platinum XT Mechanical Gaming Keyboard",
    //     description:
    //       "Premium keyboard with Cherry MX RGB switches and dedicated macro keys.",
    //     price: 199.99,
    //     quantity: 10,
    //     categoryId: 8,
    //   },
    // });
    // //9 Mice
    // const m1 = await prisma.product.create({
    //   data: {
    //     name: "Razer DeathAdder Elite Gaming Mouse",
    //     description: "Ergonomic gaming mouse with high precision sensor.",
    //     price: 69.99,
    //     quantity: 10,
    //     categoryId: 9,
    //   },
    // });
    // const m2 = await prisma.product.create({
    //   data: {
    //     name: "Logitech G502 HERO High Performance Gaming Mouse",
    //     description:
    //       "Gaming mouse with customizable weights and 16,000 DPI sensor.",
    //     price: 79.99,
    //     quantity: 10,
    //     categoryId: 9,
    //   },
    // });
    // const m3 = await prisma.product.create({
    //   data: {
    //     name: "SteelSeries Rival 600 Gaming Mouse",
    //     description:
    //       "Dual-sensor gaming mouse with customizable weight and RGB lighting.",
    //     price: 89.99,
    //     quantity: 10,
    //     categoryId: 9,
    //   },
    // });

    // //10 Monitors
    // const mon1 = await prisma.product.create({
    //   data: {
    //     name: "Samsung Odyssey G7 27in Curved Gaming Monitor",
    //     description:
    //       "QHD gaming monitor with 240Hz refresh rate and G-Sync compatibility.",
    //     price: 699.99,
    //     quantity: 10,
    //     categoryId: 10,
    //   },
    // });
    // const mon2 = await prisma.product.create({
    //   data: {
    //     name: "ASUS ROG Swift PG279Q 27in Gaming Monitor",
    //     description: "WQHD IPS monitor with 165Hz refresh rate and G-Sync.",
    //     price: 699.99,
    //     quantity: 10,
    //     categoryId: 10,
    //   },
    // });
    // const mon3 = await prisma.product.create({
    //   data: {
    //     name: "LG UltraGear 34GK950F-B 34in Curved Gaming Monitor",
    //     description:
    //       "UltraWide QHD monitor with 144Hz refresh rate and Radeon FreeSync 2.",
    //     price: 999.99,
    //     quantity: 10,
    //     categoryId: 10,
    //   },
    // });
    // //11 Sound Cards
    // const sc1 = await prisma.product.create({
    //   data: {
    //     name: "Creative Sound Blaster AE-9 PCIe Sound Card",
    //     description:
    //       "High-resolution PCIe sound card with discrete 5.1 surround and RGB lighting.",
    //     price: 349.99,
    //     quantity: 10,
    //     categoryId: 11,
    //   },
    // });
    // const sc2 = await prisma.product.create({
    //   data: {
    //     name: "ASUS Essence STX II 7.1 Sound Card",
    //     description:
    //       "Audiophile-grade sound card with high-fidelity audio and headphone amplifier.",
    //     price: 249.99,
    //     quantity: 10,
    //     categoryId: 11,
    //   },
    // });
    // const sc3 = await prisma.product.create({
    //   data: {
    //     name: "EVGA NU Audio Pro 7.1 Sound Card",
    //     description:
    //       "Premium audio solution with acoustic tuning and RGB lighting.",
    //     price: 299.99,
    //     quantity: 10,
    //     categoryId: 11,
    //   },
    // });

    // //12 Headsets
    // const hp1 = await prisma.product.create({
    //   data: {
    //     name: "SteelSeries Arctis Pro Wireless Headset",
    //     description:
    //       "High-fidelity wireless gaming headset with dual-wireless technology.",
    //     price: 329.99,
    //     quantity: 10,
    //     categoryId: 12,
    //   },
    // });
    // const hp2 = await prisma.product.create({
    //   data: {
    //     name: "HyperX Cloud Alpha S Gaming Headset",
    //     description:
    //       "Gaming headset with virtual 7.1 surround sound and detachable noise-cancelling mic.",
    //     price: 129.99,
    //     quantity: 10,
    //     categoryId: 12,
    //   },
    // });
    // const hp3 = await prisma.product.create({
    //   data: {
    //     name: "Sennheiser GSP 600 Gaming Headset",
    //     description:
    //       "Closed-back gaming headset with noise-cancelling microphone and ergonomic design.",
    //     price: 249.99,
    //     quantity: 10,
    //     categoryId: 12,
    //   },
    // });

    // //13 Cooling Systems
    // const cs1 = await prisma.product.create({
    //   data: {
    //     name: "NZXT Kraken X63 RGB 280mm AIO Liquid Cooler",
    //     description: "High-performance liquid cooler with RGB lighting.",
    //     price: 149.99,
    //     quantity: 10,
    //     categoryId: 13,
    //   },
    // });
    // const cs2 = await prisma.product.create({
    //   data: {
    //     name: "Cooler Master Hyper 212 RGB Black Edition",
    //     description: "Popular air cooler with RGB fan for efficient cooling.",
    //     price: 44.99,
    //     quantity: 10,
    //     categoryId: 13,
    //   },
    // });
    // const cs3 = await prisma.product.create({
    //   data: {
    //     name: "Noctua NH-D15 Chromax.Black Dual-Tower CPU Cooler",
    //     description:
    //       "Premium air cooler with excellent performance and quiet operation.",
    //     price: 99.99,
    //     quantity: 10,
    //     categoryId: 13,
    //   },
    // });

    // //14 Tools
    // const t1 = await prisma.product.create({
    //   data: {
    //     name: "iFixit Pro Tech Toolkit",
    //     description: "Comprehensive toolkit for PC and electronics repairs.",
    //     price: 69.99,
    //     quantity: 10,
    //     categoryId: 14,
    //   },
    // });
    // const t2 = await prisma.product.create({
    //   data: {
    //     name: "Thermal Grizzly Kryonaut Thermal Paste",
    //     description: "High-performance thermal paste for CPU and GPU cooling.",
    //     price: 12.99,
    //     quantity: 10,
    //     categoryId: 14,
    //   },
    // });
    // const t3 = await prisma.product.create({
    //   data: {
    //     name: "ESD Anti-Static Wrist Strap",
    //     description:
    //       "Essential tool for protecting PC components from electrostatic discharge.",
    //     price: 7.99,
    //     quantity: 10,
    //     categoryId: 14,
    //   },
    // });

    console.log("Finished seeding database");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
