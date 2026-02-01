import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expense.routes.js";

const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/**
 * Routes 
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


app.use("/expenses", expenseRoutes);


/**
 * Global 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

export default app;
