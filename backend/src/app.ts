import express from "express";
import cors from "cors";

import resourceRoutes from "./routes/resource.routes";
import alertRoutes from "./routes/alert.routes";
import submissionRoutes from "./routes/submission.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/resources", resourceRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/submissions", submissionRoutes);

export default app;
