import express from "express";
const cors = require("cors");

import membersRoutes from "./routes/members.routes";
import checkinsRoutes from "./routes/checkins.routes";
import paymentsRoutes from "./routes/payments.routes";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/members", membersRoutes);
app.use("/check-ins", checkinsRoutes);
app.use("/payments", paymentsRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
