## Quick Start / Backend

- **Prerequisites:** Install Node.js (recommended v16+). Verify with:

```bash
node --version
npm --version
```

- **Clone the repo:**

```bash
git clone <repo-url>
cd uniProjectFront/Backend
```

- **Install dependencies:**

```bash
npm install
```

- **Environment:**

Create a `.env` file in the `Backend` folder with the values your app needs. Common variables:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=""
DB_NAME=personality
```

Ensure your database (MySQL) is running and the database named above exists or is created by your migration/seed scripts.

- **SQL file included:**

```bash
The SQL schema/seed file for creating tables and initial data is included
in the `Backend` folder (look for any `.sql` files). Import it to your DBMS.
```

- **Run in development (auto-restarts with changes):**

```bash
npm run dev
```

- **Run in production / start server:**

```bash
npm start
```

**Available npm scripts**

- `dev` — run the server with `nodemon` (auto-reload during development).
- `start` — start the Node.js server (`node src/index.js`).
