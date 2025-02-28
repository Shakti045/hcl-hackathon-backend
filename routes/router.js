import express from 'express';
import { wrapAsyncRoutes } from '../utils/errorhandler.js';
import { validateRequest } from '../utils/validaterequest.js';
import { UserSchema } from '../zodscheemas/userScheema.js';


const router = wrapAsyncRoutes(express.Router());

router.post('/users/:userId',validateRequest(UserSchema), async (req, res) => {
   res.json({
    "success":true,
    "message":"OK"
   })
});

export default router;
