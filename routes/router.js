import express from 'express';
import { wrapAsyncRoutes } from '../utils/errorhandler.js';


const router = wrapAsyncRoutes(express.Router());

router.get('/users', async (req, res) => {
   res.json({
    "success":true,
    "message":"OK"
   })
});

export default router;
