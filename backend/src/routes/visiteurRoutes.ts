import { Router } from "express";
import { VisiteurController } from "../controllers/VisiteurController";

const router = Router();

router.post("/", VisiteurController.create);
router.get("/:id", VisiteurController.getOne);
router.get("/", VisiteurController.getAll);
router.get("/stats", VisiteurController.getStats);
router.put("/:id", VisiteurController.update);
router.delete("/:id", VisiteurController.delete); 

export default router;