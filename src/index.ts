import express, { Express, Request, Response } from "express";
import { createServer } from "node:http";
import "dotenv/config";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PORT = process.env.PORT!;

const app: Express = express();
const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
