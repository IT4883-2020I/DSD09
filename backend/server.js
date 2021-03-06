import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import incidentRoutes from "./routes/incidentRoutes.js";
import incidentTypeRoutes from "./routes/incidentTypeRoutes.js";
import incidentStatusRoutes from "./routes/incidentStatusRoutes.js";
import incidentLevelRoutes from "./routes/incidentLevelRoutes.js";
import incidentTagRoutes from "./routes/incidentTagRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

var options = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Danh sách API nhóm 9 - Quản lý sự cố"
};

dotenv.config();

connectDB();

const app = express();
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/incidents", incidentRoutes);
app.use("/api/incident-types", incidentTypeRoutes);
app.use("/api/incident-status", incidentStatusRoutes);
app.use("/api/incident-levels", incidentLevelRoutes);
app.use("/api/incident-tags", incidentTagRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
