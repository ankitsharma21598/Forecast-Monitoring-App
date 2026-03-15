import { Router } from "express";
import { getWindData } from "../controllers/windController";

const router: ReturnType<typeof Router> = Router();


router.get("/", getWindData);

export default router;
