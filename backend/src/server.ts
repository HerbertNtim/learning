import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import { authRouter } from "./routes";

// CONFIGURATIONS
dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";

const __dirname = path.resolve();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

app.use(morgan(isProduction ? "combined" : "dev"));
app.use(cookieParser());

// ROUTES
app.use("/vibechat/auth", authRouter);

// HEALTH CHECK
app.get("/health", (_req, res) => {
  res.status(200).json({
    message: "VibeChat API is running",
    environment: NODE_ENV,
  });
});

// SERVE FRONTEND IN PRODUCTION
if (isProduction) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

// SERVER
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${NODE_ENV} mode`
  );
});
