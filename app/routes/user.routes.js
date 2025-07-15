import express from "express";
import { authJwt } from "../middlewares/index.js";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

// Test routes
router.get("/test/user", [authJwt.verifyToken], controller.userBoard);
router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

// User CRUD routes
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);
router.get("/profile", [authJwt.verifyToken], controller.getUserProfile);
router.get("/:id", [authJwt.verifyToken], controller.getUserById);
router.put("/:id", [authJwt.verifyToken], controller.updateUser);
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteUser
);

export default router;
