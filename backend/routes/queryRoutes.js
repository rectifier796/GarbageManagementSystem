import express from "express";
import { queryRegistrationValidation, regionValidation } from "../middlewares/validator.middleware.js";
import { parseData } from "../middlewares/parseData.middleware.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { getQuery, getQueryByUserId, getRegion, registerQuery, registerRegion } from "../controllers/query.controller.js";
import { checkAdmin } from "../middlewares/checkAdmin.middleware.js";

const queryRoutes = express.Router();

queryRoutes.post("/register", checkAuth, parseData, queryRegistrationValidation,registerQuery);

queryRoutes.post("/register-region", checkAuth, checkAdmin, parseData, regionValidation, registerRegion);

queryRoutes.get("/region", getRegion);

queryRoutes.get("/query", getQuery);

queryRoutes.get("/query-userid", checkAuth, getQueryByUserId);

export default queryRoutes;
