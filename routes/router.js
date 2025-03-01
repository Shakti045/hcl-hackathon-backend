import express from 'express';
import { wrapAsyncRoutes } from '../utils/errorhandler.js';
import { validateRequest } from '../utils/validaterequest.js';
import { queerySchema } from '../zodscheemas/userScheema.js';
import { confirmtransaction, getusertrasactions, leastchargeclaculator, leastTimeCalculator } from '../services/index.js';
import { getotp, login, signup } from '../services/auth.js';
import { getbanks } from '../scripts/index.js';
import { authenticate } from '../utils/middleware.js';


const router = wrapAsyncRoutes(express.Router());

router.get("/leastcharge",validateRequest(queerySchema.query),authenticate,leastchargeclaculator);
router.get("/least-time",validateRequest(queerySchema.query),authenticate,leastTimeCalculator);
router.get("/getbanks",getbanks);
router.get("/confirmtrasaction/:trasactionId",confirmtransaction);
router.post("/getotp",getotp);
router.post("/signup",signup);
router.post("/login",login);
router.get("/user/trasactions",authenticate,getusertrasactions)

export default router;
