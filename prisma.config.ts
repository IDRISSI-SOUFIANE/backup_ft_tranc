import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});

/*
prisma.config.ts
       │
       └── DATABASE_URL
              │
              ▼
      Prisma CLI / migrations

And:

lib/prisma.ts
       │
       └── PrismaMariaDb adapter
              │
              ▼
           MariaDB

PrismaClient is the Prisma API your application uses;
PrismaMariaDb is the adapter that gives that client a way to connect to MariaDB.
*/