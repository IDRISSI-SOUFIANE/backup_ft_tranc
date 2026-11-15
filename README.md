# 📚 Learning & Development Log

This README documents my learning progress, research, and resources while developing the **Network Section** of the project with **Next.js, Prisma, and MySQL**.

---

## 📁 Project Structure & Organization

### Today — 09/26/2026

Studied how to organize a Next.js project using the App Router.

**Resource:**

- [Next.js — Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)

---

# 🗄️ Database & Network Section

## Today — 09/27/2026

### Database

- Designed and built the database tables using **Prisma**.
- Studied database relationships and data modeling.

### Research: Network Section

I researched how a professional social network such as **LinkedIn** could model its network/connection system.

I discovered that LinkedIn has used **graph-based technologies** for parts of its infrastructure. Since our project uses **MySQL**, I focused on understanding the underlying concepts rather than trying to reproduce LinkedIn's exact architecture.

### 🔗 Graph Databases — Neo4j

Resources:

- [Neo4j — Graph Database](https://neo4j.com/docs/getting-started/graph-database/)
- [Neo4j — Graph Database Concepts](https://neo4j.com/docs/getting-started/appendix/graphdb-concepts/)
- [Neo4j GraphAcademy — Neo4j Fundamentals](https://graphacademy.neo4j.com/courses/neo4j-fundamentals/) ⚠️ **Not completed yet**
- [YouTube — Arabic Resource](https://www.youtube.com/watch?v=TWTKt7M2FCk) ⚠️ **Arabic resource**

### 🐬 MySQL — Data Modeling & Relationships

Resources:

- [YouTube — MySQL Playlist](https://www.youtube.com/playlist?list=PLDoPjvoNmBAz6DT8SzQ1CODJTH-NIA7R9) <!-- done >
- [Datensen — Many-to-Many Relationships](https://www.datensen.com/blog/er-diagram/many-to-many-relationships/) <!-- done >

### 🔷 Prisma

Resources:

- [Prisma ORM v7 Documentation](https://www.prisma.io/docs/orm/v7) <!-- done >
- [Prisma — MySQL Quickstart](https://www.prisma.io/docs/v7/prisma-orm/quickstart/mysql) ⚠️ **Important** <!-- done >
- [ChatGPT Discussion](https://chatgpt.com/share/6ab92510-8348-83ea-b0d3-9b68713c0c81)

---

## Today — 09/28/2026

### Prisma

Continued studying **Prisma ORM** and database modeling.

Resources:

- [YouTube — Prisma Tutorial](https://www.youtube.com/watch?v=uRPLhqR_d5I&t=92s) <!-- done >

### Database Architecture

- Designed the architecture and relationships between the database tables.

---

## Today — 09/30/2026

### Prisma Migrate

Studied how **Prisma Migrate** works and how database schema changes are managed.

Resources:

- [Prisma — Getting Started with Prisma Migrate](https://www.prisma.io/docs/orm/v7/prisma-migrate/getting-started) <!-- done >
- [Prisma — Prisma Migrate Mental Model](https://www.prisma.io/docs/orm/v7/prisma-migrate/understanding-prisma-migrate/mental-model) ⚠️ **Important for understanding how migrations work** <!-- done >

---

# 🔎 Prisma Queries

## Today — 10/01/2026

Studied how to read, write, filter, sort, and work with relationships using Prisma Client.

Resources:

- [YouTube — DB Index Concept](https://www.youtube.com/watch?v=t0grczCICMk) <!-- done >
- [YouTube — DB Index Concept](https://www.youtube.com/watch?v=BxAj3bl00-o) <!-- done >
- [Prisma — CRUD Queries](https://docs.prisma.io/docs/orm/v7/prisma-client/queries/crud) ⚠️ **Important — read carefully** <!-- done >
- [Prisma — Query Options / Cursor](https://mintlify.wiki/prisma/prisma/api/query-options#cursor) ⚠️ **Important** <!-- done >
- [Prisma — Reading Data](https://www.prisma.io/docs/orm/fundamentals/reading-data) <!-- done >
  - `where`
  - `select`
  - `findFirst`
  - `findMany`
  - etc.

- [Prisma — Writing Data](https://www.prisma.io/docs/orm/fundamentals/writing-data) <!-- done >
- [Prisma — Relations & Joins](https://www.prisma.io/docs/orm/fundamentals/relations-and-joins) ⚠️ **Important** <!-- done >
  - One-to-one
  - One-to-many
  - Many-to-many

- [Prisma — Filtering & Sorting](https://docs.prisma.io/docs/orm/v7/prisma-client/queries/filtering-and-sorting) <!-- done >

---

# ⚛️ React

## Today — 10/02/2026

### React Hydration

Studied **React hydration** and how server-rendered HTML becomes interactive on the client.

Resources:

- [YouTube — React Hydration](https://www.youtube.com/watch?v=87i0pejrULw)
- [React — hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)

---

# 🌐 HTTP & Next.js API Routes

## Today — 10/03/2026

### HTTP Methods

Studied HTTP methods and how they are used when communicating between the client and server.

Resources:

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) ⚠️ **Good resource for testing APIs**
- [HTTP.dev](https://http.dev/)
- [HTTP.dev — PATCH](https://http.dev/patch) ⚠️ **Good resource**

The `http.dev` website can be used to study different HTTP methods by changing the method in the URL:

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`

### PATCH

Studied the `PATCH` HTTP method and its purpose for partially updating resources.

Resources:

- [Postman — HTTP PATCH Method](https://blog.postman.com/http-patch-method/)
- [HTTP.dev — PATCH](https://http.dev/patch)

---

## NextRequest & NextResponse

Studied how **Next.js API routes** receive requests and send responses.

Resources:

- [Next.js — NextRequest](https://nextjs.org/docs/app/api-reference/functions/next-request)
- [YouTube — NextRequest & NextResponse](https://www.youtube.com/shorts/yQozTMAaBKM)

### `NextRequest`

`NextRequest` represents the **request coming from the client to the server**.

Example:

```json
{
  "senderId": "u001",
  "receiverId": "u002"
}
```

In other words:

> **NextRequest → What the client sends to the server.**

### `NextResponse`

`NextResponse` represents the **response sent by the server back to the client**.

Example:

```typescript
return NextResponse.json({ message: "Connection created" }, { status: 201 });
```

In other words:

> **NextResponse → What the server sends back to the client.**

---

# 🛣️ Dynamic Routes

## Today — 10/03/2026

Studied **Dynamic Routes** in Next.js and how dynamic URL parameters are handled.

Resources:

- [YouTube — Dynamic Routes](https://www.youtube.com/watch?v=k9g6aVLH3p4) ⚠️ **Important**
- [YouTube — Next.js Playlist](https://www.youtube.com/watch?v=b4ba60j_4o8&list=PLC3y8-rFHvwhIEc4I4YsRz5C7GOBnxSJY) ⚠️ **Good playlist**
- [Next.js — Dynamic Routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)
- [Next.js — App Router Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) ⚠️ **Important**
- [Next.js — Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route) ⚠️ **Important**

## WebSocket

- [WebSocket](https://talent500.com/blog/websockets-real-time-communication-between-clients-and-servers/)
- [Youtube - WebSocket_1](https://www.youtube.com/watch?v=ZKEqqIO7n-k)
- [Youtube - WebSocket_2](https://www.youtube.com/watch?v=EsRHaG8pBeI)

---

# 🎯 Main Topics Covered

Throughout this phase of the project, I focused on:

- **Next.js App Router**
- **Project structure**
- **React hydration**
- **HTTP methods**
- **REST APIs**
- **NextRequest / NextResponse**
- **Dynamic routes**
- **Route handlers**
- **Prisma ORM**
- **Prisma Client**
- **Prisma Migrate**
- **MySQL**
- **Database modeling**
- **Database relationships**
- **One-to-one relationships**
- **One-to-many relationships**
- **Many-to-many relationships**
- **Graph database concepts**
- **Network/connection system architecture**

---

# 🚀 Project Goal

The main goal of this learning phase is to understand and implement a **LinkedIn-inspired Network Section** using:

```text
Next.js
   │
   ├── App Router
   ├── Route Handlers
   ├── NextRequest / NextResponse
   └── Dynamic Routes
          │
          ▼
       Prisma
          │
          ▼
        MySQL
```

The focus is on understanding the **database architecture, relationships, API design, and Next.js structure** required to build a reliable connection/network system.
