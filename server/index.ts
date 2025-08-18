import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
} from "./routes/blog";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Blog API routes
  app.post("/api/blog/create", createBlogPost);
  app.get("/api/blog/posts", getAllBlogPosts);
  app.get("/api/blog/posts/:id", getBlogPostById);
  app.put("/api/blog/posts/:id", updateBlogPost);
  app.delete("/api/blog/posts/:id", deleteBlogPost);

  return app;
}
