import express from "express";
import {
  aboutMe,
  loginUser,
  logout,
  registerUser,
  userDetails,
  validateUser,
} from "../controllers/auth.controller.js";
import { loginValidation, registrationValidation, validValidation } from "../middlewares/validator.middleware.js";
import { parseData } from "../middlewares/parseData.middleware.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { checkGC } from "../middlewares/checkGC.js";

const authRoutes = express.Router();

authRoutes.post("/register", parseData, registrationValidation,registerUser);

authRoutes.post("/validate", parseData, validValidation, validateUser);

authRoutes.post("/login", parseData, loginValidation, loginUser);

authRoutes.get("/logout", checkAuth, logout);

authRoutes.get("/me", checkAuth, checkGC, aboutMe);

authRoutes.get("/profile", checkAuth, userDetails);

export default authRoutes;
