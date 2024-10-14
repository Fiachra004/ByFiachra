import express from 'express';
import dotenv from "dotenv";
import sectionRoutes from './routes/section.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(express.json());

app.use("/api/section", sectionRoutes);

app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
})