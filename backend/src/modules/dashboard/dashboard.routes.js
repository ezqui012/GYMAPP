import { Router } from "express";
import { getDashboardStats, getExpiredMemberships, getExpiringMemberships } from "./dashboard.controller.js";

const router= Router()

router.get('/dashboardStats', getDashboardStats);
router.get('/expiredMemberships', getExpiredMemberships);
router.get('/expiringMemberships', getExpiringMemberships);

export default router;