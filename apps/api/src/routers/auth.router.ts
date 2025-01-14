import { Router } from "express";
import { registerProcess, loginProcess } from "../controllers/auth.controller";

const router = Router();

router.post("/login", loginProcess);
router.post("/register", registerProcess);

export default router;
