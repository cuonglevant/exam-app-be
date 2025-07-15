import express from "express";
import * as controller from "../controllers/role.controller.js";

const router = express.Router();

// Role routes
router.post("/", controller.createRole);
router.get("/", controller.getRoles);
router.get("/:id", controller.getRoleById);
router.get("/name/:name", controller.getRoleByName);
router.put("/:id", controller.updateRole);
router.delete("/:id", controller.deleteRole);
router.post("/initialize", controller.initializeDefaultRoles);

export default router;
