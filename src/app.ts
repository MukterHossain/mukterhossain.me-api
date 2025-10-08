
import cors from "cors";
import express from "express";

import { AuthRouter } from "./modules/auth/auth.routes";
import { BlogRouter } from "./modules/blog/blog.route";
import { ProjectRouter } from "./modules/project/project.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use(
  cors({
    origin:[ "http://localhost:3000", "https://mukterhossainme.vercel.app"],
    credentials: true,
  })
);


app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/blog", BlogRouter)
app.use("/api/v1/project", ProjectRouter)



app.get("/", (_req, res) => {
  res.send("API is running");
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;