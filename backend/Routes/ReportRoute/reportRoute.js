import express from 'express';
import upload from '../../Middlewares/UploadMiddleware/uploadMiddleware.js';
import { uploadReport, addVitals, getMedicalTimeline } from '../../Controllers/ReportController/reportController.js';
import { isAuthenticated } from '../../Middlewares/AuthenticatedMiddleware/isAuthenticatedMiddleware.js';

const router = express.Router();

router.post('/upload', isAuthenticated, upload.single('report'), uploadReport);
router.post('/vitals', isAuthenticated, addVitals);
router.get('/timeline', isAuthenticated, getMedicalTimeline);

export default router;