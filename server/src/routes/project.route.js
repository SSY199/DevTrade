import express from "express"
import { getAllProject, uploadProject, updateProject, deleteProject, getMyProject, getProjectById } from "../controllers/project.controller.js";

const router = express.Router()

router.get("/", getAllProject)
router.post("/upload", uploadProject)
router.patch("/update/:id", updateProject)
router.delete("/delete/:id", deleteProject)
router.get("/getMyProject/:id", getMyProject)
router.get("/getProjectById/:id", getProjectById)



export default router;